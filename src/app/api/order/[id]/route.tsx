import { ordersModel } from "@/models/orders";
import { connectDB } from "@/utils/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async ({ params }: any) =>{
  const keywords = params.id;
  try{
  const orders = await ordersModel.find({first_name: {$regex: keywords}});

      return NextResponse.json(orders) 

  }catch(error){
      return NextResponse.json(error)
  }

}

export const PUT = async (req: NextRequest, { params }: any) => {
  const { id } = params;
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
    paid_amount: data.paid_amount,
  };

  await connectDB();
  try {
    await ordersModel.updateMany(
      { _id: id },
      {
        $set: {
          hog_number: order.hog_number,
          first_name: order.first_name,
          last_name: order.last_name,
          no_of_kilos: order.no_of_kilos,
          description: order.description,
          pick_up_time: order.pick_up_time,
          amount: order.amount,
          order_type: order.order_type,
          paid_amount: order.paid_amount,
        },
      }
    );

    return NextResponse.json({ message: "Successfully updated" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
};

export const DELETE = async (req: NextRequest, { params }: any) => {
  const { id } = params;

  await connectDB();
  try {
    await ordersModel.deleteOne({_id: id})

    return NextResponse.json({ message: "Successfully deleted" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
};
