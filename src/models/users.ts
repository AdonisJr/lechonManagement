import mongoose, { Document, Schema } from "mongoose";

interface UserDocument extends Document{
    first_name: string;
    last_name: string;
    wish: number;
    email: string;
    password: string;
    role: 'user' | 'admin';
    updated_at: Date;
    created_at: Date;
}   

interface Methods {
    comparePassword(password: string): Promise<boolean>
}

export const usersSchema = new Schema<UserDocument, {}, Methods>({
    first_name: { type: String, required: true, trim: true },
    last_name: { type: String, required: true, trim: true},
    email: { type: String, required: true},
    password: { type: String, required: true },
    role:{ type: String, enum: ['user', 'admin'], default: 'user' },
    updated_at:{ type: Date, default: Date.now },
    created_at:{ type: Date, default: Date.now }
})

export const usersModel = mongoose.models.users || 
    mongoose.model("users", usersSchema);
