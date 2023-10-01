import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/mongoDB";
import { ordersModel } from "@/models/orders";

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const search = searchParams.get("search");
  const time = searchParams.get("time") || "";
  const date = searchParams.get("date") || "";

  await connectDB();
  try {
    if (date && time) {
      const orders = await ordersModel.find({
        $and: [
          {
            pick_up_date: date,
            pick_up_time: time,
          },

          {
            $or: [
              { first_name: { $regex: search, $options: "i" } },
              { last_name: { $regex: search, $options: "i" } },
              { hog_number: { $regex: search, $options: "i" } },
            ],
          },
        ],
      });
      // console.log(orders)
      return NextResponse.json(orders);
    } else if (date && !time) {
      const orders = await ordersModel.find({
        $and: [
          {
            pick_up_date: date,
          },

          {
            $or: [
              { first_name: { $regex: search, $options: "i" } },
              { last_name: { $regex: search, $options: "i" } },
              { hog_number: { $regex: search, $options: "i" } },
            ],
          },
        ],
      });
      // console.log(orders)
      return NextResponse.json(orders);
    } else if (!date && time) {
      const orders = await ordersModel.find({
        $and: [
          {
            pick_up_time: time,
          },

          {
            $or: [
              { first_name: { $regex: search, $options: "i" } },
              { last_name: { $regex: search, $options: "i" } },
              { hog_number: { $regex: search, $options: "i" } },
            ],
          },
        ],
      });
      // console.log(orders)
      return NextResponse.json(orders);
    } else {
      const orders = await ordersModel.find({
        $or: [
          { first_name: { $regex: search, $options: "i" } },
          { last_name: { $regex: search, $options: "i" } },
          { hog_number: { $regex: search, $options: "i" } },
        ],
      });
      // console.log(orders)
      return NextResponse.json(orders);
    }
  } catch (error) {
    return NextResponse.json(error);
  }
};

export const POST = async (req: NextRequest) => {
  const data = await req.json();
  const order = {
    hog_number: data.hog_number,
    first_name: data.first_name.trim(),
    last_name: data.last_name.trim(),
    no_of_kilos: data.no_of_kilos,
    description: data.description,
    pick_up_date: data.pick_up_date,
    pick_up_time: data.pick_up_time,
    amount: data.amount,
    order_type: data.order_type,
    paid_amount: data.paid_amount,
  };
  await connectDB();
  try {
    await ordersModel.create(order);

    return NextResponse.json({ message: "Successfully added" });
  } catch (error) {
    console.log(error);
  }
};
