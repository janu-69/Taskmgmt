const mongoose=require("mongoose");

const taskschema=mongoose.Schema({
    title:String,
    description:String,
    date:String,
    asign:String,
    category:String,
    status:String

});

const taskmodel=new mongoose.model("task",taskschema);


module.exports=taskmodel;