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
        required:true
    }
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
