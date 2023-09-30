import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/mongoDB";
import { usersModel } from "@/models/users";

export const POST = async (req: NextRequest) =>{
    const user = await req.json()
    // console.log(user)

    try{
        await connectDB();
        const userDetails = await usersModel.findOne({_id: user.id}).then( res => {
            return{
                id: res._id,
                name: res.last_name + ',' + res.first_name.split('')[0],
                email: res.email,
                role: res.role,
            }
        })

        return NextResponse.json(userDetails)

    }catch(error){
        return NextResponse.json({message: error})
        return new Error('Server Error')
    }
}