import { NextAuthOptions } from 'next-auth';
import { connectDB } from './mongoDB';
import { usersModel } from '@/models/users';
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
const bcrypt = require('bcrypt');

export const authOptions:NextAuthOptions = {

    providers: [
        CredentialsProvider({
          // The name to display on the sign in form (e.g. "Sign in with...")
          name: "Credentials",
          // `credentials` is used to generate a form on the sign in page.
          // You can specify which fields should be submitted, by adding keys to the `credentials` object.
          // e.g. domain, username, password, 2FA token, etc.
          // You can pass any HTML attribute to the <input> tag through the object.
          // credentials: {},
          credentials: {
            email: { label: "Email", type: "text", placeholder: "Adonis" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
            const {email, password} = credentials as {
              email: string,
              password: string
            }
            // Add logic here to look up the user from the credentials supplied
            await connectDB()

            const user = await usersModel.findOne({email});
            if(!user) throw Error('Email not found')

            const isPasswordValid = await bcrypt.compare(password, user.password)
            if(!isPasswordValid) throw Error('Invalid password');
            if(user.role === 'user') throw Error("You don't have permission to access this page, please contact administrator.")

            // return the session data
            return {
              id: user._id,
              name: user.firstName + ' ' + user.lastName,
              email: user.email,
              role: user.role,
              wish: user.wish
            }

          }
        }),
        FacebookProvider({
          clientId: process.env.FACEBOOK_CLIENT_ID as string,
          clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string
        })
    ],
    callbacks:{
      async jwt({token, user}){
        if(user){
          token.role = user.role;
          token.id = user.id;
        }
        // return final token
        return token
      },
      session({session, token}){
        if(session.user){
          (session.user as {id: string}).id = token.id as string
          (session.user as {role: string}).role = token.role as string
        }
        return session
      }
    },
    // pages:{
    //   // signIn: '/auth/signIn'
    // }
}