import mongoose from "mongoose"

export const connectdb=async()=>{
   //console.log("database")
   try {
        await mongoose.connect(process.env.DB_URL)
        console.log("MongoDB connected successfully")
   } catch (error) {
        console.log("connection failed",error.message)
   }
}