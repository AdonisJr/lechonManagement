import mongoose from "mongoose"

export const connectDB = async () =>{
    try{
        if(mongoose.connection.readyState === 0 ){
            await mongoose.connect(`${process.env.NEXT_PUBLIC_MONGODB_URI}`);
            console.log("db connected")
        }
    }catch(error){
        console.log(error)
    }
}