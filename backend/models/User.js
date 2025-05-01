const mongoose=require("mongoose");
const bycrpt=require("bcrypt");
const validator=require("validator");

const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        unique:true,
        validate:[validator.isEmail,"Please Provide a Valid Email Address"]
    },
    password:{
        type:String,
        required:true,
        minlength:[8,"Password must be at least 8 characters Long"],
        maxlength:[128,"Password must be less than 128 characters"]
    },
    role:{
        type:String,
        enum:["passenger","driver"],
        default:"passenger"
    },
    phoneNo:{
        type:String,
        trim:true,
        match:[/^\+\d{6,15}$/,'Phone must be in E.164 form (e.g. +14155552671)'],
        unique:true
    },
    address:{
        type:String,
    },
    prefferedPayment:{
        type:String,
        enum:["credit card","upi"],
        default:"credit card"
    },
    dateOfBirth:Date,
    totalDistanceKm: {
        type: Number,
        default: 0,
    },
    amountSpent: {
        type: Number,
        default: 0,
    },
    ridesThisMonth: {
        type: Number,
        default: 0,
    },
    rating: {
        type: Number,
        default: 5,
    },
},{timestamps:true});

userSchema.pre("save",async function(next){
     const user=this;
     if(user.isModified("password")){
        user.password=await bycrpt.hash(user.password,10);
     }
     next();   
});

userSchema.methods.comparePassword=async function(password){
    return await bycrpt.compare(password,this.password);
}

const User=mongoose.model("User",userSchema);

module.exports=User;
