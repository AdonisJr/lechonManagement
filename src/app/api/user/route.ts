import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/mongoDB";
import { usersModel } from "@/models/users";
const bcrypt = require('bcrypt');

export const POST = async (req: NextRequest) =>{
    const data = await req.json();
    const hashedPassword = await bcrypt.hash(data.password, 13)
    const user = {
        first_name: data.first_name.trim().charAt(0).toUpperCase() + data.first_name.slice(1),
        last_name: data.last_name.trim().charAt(0).toUpperCase() + data.last_name.slice(1),
        email: data.email,
        password: hashedPassword
    }
    await connectDB();
    try{
        const alreadyExist = await usersModel.find({email: user.email})

        if(alreadyExist.length === 1)return NextResponse.json('Email already exist')
        
        await usersModel.create(user)
        
        return NextResponse.json({message: 'Successfully added'}) 

    }catch(error){
        console.log(error)
    }
  
}