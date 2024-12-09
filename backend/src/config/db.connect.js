
import mongoose from "mongoose";

export const dbConnect = async() => {
    try {
        const conn = await mongoose.connect(process.env.DB_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
        
    } catch (error) {
        console.log(error.message);
    }

}