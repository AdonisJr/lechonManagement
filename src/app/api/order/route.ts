import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/mongoDB";
import { ordersModel } from "@/models/orders";

export const GET = async (req: NextRequest) =>{
    await connectDB();
    try{
        const orders = await ordersModel.find();

        return NextResponse.json(orders) 

    }catch(error){
        return NextResponse.json(error)
    }
  
}

export const POST = async (req: NextRequest) =>{
    const data = await req.json();
    const order = {
        hog_number: data.hog_number,
        first_name: data.first_name.trim(),
        last_name: data.last_name.trim(),
        no_of_kilos: data.no_of_kilos,
        description: data.description,
        pick_up_time: data.pick_up_time,
        amount: data.amount,
        order_type: data.order_type,
        paid_amount: data.paid_amount
    }
    console.log(order)
    await connectDB();
    try{
        await ordersModel.create(order)
        
        return NextResponse.json({message: 'Successfully added'}) 

    }catch(error){
        console.log(error)
    }
}
