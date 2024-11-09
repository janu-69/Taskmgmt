const express=require("express");
const mongoose=require('mongoose');
const adminmodel=require("./database/admindb.js");
const cors=require("cors");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const taskmodel=require('./database/taskdb.js');
const usermodel=require("./database/userdb.js");

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:"http://localhost:5173",
}));


const userauthrization=async(req,res,next)=>{
    const data=jwt.verify(req.headers.token,"acnidcddkvdvdvfnbjascv");
    const user=await usermodel.findOne({email:data.email});
    if(!req.headers.token && user){
        res.send({message:"Something went wrong at Authorization"});
    }
    else{
        next();
    }

}
const adminauthrization=async(req,res,next)=>{
    const admindata=jwt.verify(req.headers.token,"acnidcddkvdvdvfnbj");
    const admin=await adminmodel.findOne({email:admindata.email});
    if(!req.headers.token && admin){
        res.send({message:"Something went wrong at Authorization"});
    }
    else{
        next();
    }
 
}

const port = 7000;

app.post("/signup",async(req,res)=>{
    const {name,email,password,role}=req.body;
    if(name && email && password){
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(password,salt,async(err,hash)=>{
                const admin=await adminmodel.create({
                    name,
                    email,
                    password:hash,
                    role
                });
                if(admin){
                    res.send({message:"admin created"});

                }
            })
        })
    }
    
})

app.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    if(email && password){
        let data=await adminmodel.findOne({email:email})
    if(data){
       bcrypt.compare(password,data.password,(err,result)=>{
        if(result){
            const token=jwt.sign({email:data.email},"acnidcddkvdvdvfnbj",{expiresIn:'1h'});
            res.send({role:data.role,status:200 , token:token});

        }
        else{
            res.send({message:"faliure" , status:400})
        }
       })
    }
    }
    else{
        res.send({message:"error"});
    }
})


app.post('/createtask',adminauthrization,async(req,res)=>{
    const {title,description,date,asign,category,status}=req.body;
    if(title && description && asign && category && status){ 
        const taskcreate=await taskmodel.create({
            title,
            description,
           date,
            asign,
            category,
            status
        })
        if(taskcreate){
            res.send({message:"task created"});
        }
        else{
            res.send({message:"not created"});
        }
    }
    else{
        res.send({message:"send all data"});
    }
   
})


app.post("/usersignup",async(req,res)=>{
    const {name,email,password,role}=req.body;
    if(name && email && password){
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(password,salt,async(err,hash)=>{
                const user=await usermodel.create({
                    name,
                    email,
                    password:hash,
                    role
                });
                if(user){
                    res.send({message:"user created"});

                }
            })
        })
    }
    else{
        res.send({message:"error"})   
    }
    
})


app.post("/userlogin",async(req,res)=>{
    const {email,password}=req.body;
    if(email && password){
    let data=await usermodel.findOne({email:email})
    if(data){
       bcrypt.compare(password,data.password,(err,result)=>{
        if(result){
            const token=jwt.sign({email:data.email},"acnidcddkvdvdvfnbjascv",{expiresIn:'1h'})
            res.send({role:data.role,name:data.name, token:token});

        }
        else{
            res.send({message:"faliure" , status:400})
        }
       })
    }
    }
})


app.post('/getusertask',userauthrization,async(req,res)=>{
    const taskdata=await taskmodel.find({asign:req.body.name})
    if(taskdata){
        res.send(taskdata)
    }
    else{
        res.send("nothing is found");
    }
})
 
app.post("/updatestatus",userauthrization,async(req,res)=>{
    const {id,status}=req.body;
    const messagestatus=status;
    let newdata={
        status
    }
    const data=await taskmodel.findByIdAndUpdate(id,newdata,{new:true});
    if(data){
        res.send({message:messagestatus})
    }
    else{
        res.send({message:"fail"});
    }
})

app.post("/deletetasks",adminauthrization,async(req,res)=>{
    const modifyid=req.body;
    const data=await taskmodel.deleteMany({_id:{$in : modifyid}});
    if(data){
        res.send({message:"tasks deleted"});
    }
    else{
        res.send({message:"something went wrong"})
    }
})

app.get("/gettasks",adminauthrization,async(req,res)=>{
    const taskdata=await taskmodel.find();
    res.send(taskdata);
})

app.get("/userdata",adminauthrization,async(req,res)=>{
    const users=await usermodel.find();

    res.send(users);
})

app.listen(port,()=>{
    console.log(`port is running at : http://localhost:${port}`);
})