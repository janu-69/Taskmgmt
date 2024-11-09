const mongoose=require("mongoose");


mongoose.connect("mongodb://127.0.0.1:27017/management")
.then(()=>{
    console.log("mongodb is connected");
})
.catch((err)=>{
    console.log(err);
})

const adminschema=mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:String
});

const adminmodel=new mongoose.model("admin",adminschema);


module.exports=adminmodel;