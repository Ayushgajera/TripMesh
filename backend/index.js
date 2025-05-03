const dotenv=require("dotenv");
dotenv.config();
const express=require("express");
const cookieParser=require("cookie-parser");
const connectToDb=require("./helpers/connectionToDb.js");
const userRouter=require("./routes/authRoutes.js");
const driverRouter=require("./routes/driverRoutes.js");
const app=express();
const cors=require("cors");
const cron=require("node-cron");
const autoApproveDrivers = require("./jobs/autoApproveDriver.js");

cron.schedule("* * * * *",()=>{
    console.log("Running Approval cron job...");
    autoApproveDrivers();
})

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    optionSuccessStatus: 200,
}))

connectToDb();

app.use(express.json());
app.use(cookieParser());

app.get('/',(req,res)=>{
    return res.end("hello world...")
});

app.use("/api/v1/user",userRouter);
app.use("/api/v1/driver",driverRouter);

app.listen(5000,()=>{
    console.log("Server is Running on Port 5000");
})