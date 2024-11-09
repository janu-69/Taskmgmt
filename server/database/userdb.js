const mongoose=require("mongoose");



const userschema=mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:String
});

const usermodel=new mongoose.model("users",userschema);


module.exports=usermodel;