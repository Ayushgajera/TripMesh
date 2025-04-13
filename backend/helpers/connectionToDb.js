const mongoose=require("mongoose");

const connectToDb=async()=>{
    try {
        const conn=await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error.message);
    }
}

module.exports=connectToDb;