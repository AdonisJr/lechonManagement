import mongoose, { Document, Schema } from "mongoose";

interface UserDocument extends Document{
    hog_number: string;
    first_name: string;
    last_name: string;
    no_of_kilos: number;
    description: string;
    pick_up_date: String;
    pick_up_time: String;
    amount: number;
    order_type: string;
    paid_amount: number;
    updated_at: Date;
    created_at: Date;
}   

export const ordersSchema = new Schema<UserDocument>({
    hog_number: {type: String},
    first_name: { type: String, trim: true },
    last_name: { type: String, trim: true},
    no_of_kilos: { type: Number},
    description: { type: String},
    pick_up_date: { type: String},
    pick_up_time: { type: String},
    amount:{ type: Number, default: 0},
    order_type: {type: String},
    paid_amount: {type: Number, default: 0},
    updated_at:{ type: Date, default: Date.now },
    created_at:{ type: Date, default: Date.now }
})

export const ordersModel = mongoose.models.orders || 
    mongoose.model("orders", ordersSchema);
