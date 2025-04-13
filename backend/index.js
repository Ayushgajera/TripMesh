const express=require("express");
const dotenv=require("dotenv");
const cookieParser=require("cookie-parser");
const connectToDb=require("./helpers/connectionToDb.js");
const userRouter=require("./routes/authRoutes.js");
const app=express();
const cors=require("cors");

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    optionSuccessStatus: 200,
}))

dotenv.config();
connectToDb();

app.use(express.json());
app.use(cookieParser());

app.get('/',(req,res)=>{
    return res.end("hello world...")
});

app.use("/api/v1/user",userRouter);

app.listen(5000,()=>{
    console.log("Server is Running on Port 5000");
})