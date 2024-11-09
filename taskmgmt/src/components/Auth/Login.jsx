import React, { useState } from 'react'
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {

    

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate =useNavigate();


    const submitlogin = (e)=>{
        e.preventDefault()
        const data={email:email,password:password};
        axios.post("http://localhost:7000/login",data)
        .then((res)=>{ 
            const token=res.data.token;
            localStorage.setItem("token",token);
            window.localStorage.setItem("role",res.data.role);
            if(token){
            navigate("/admindashboard");
            }
            else{
                alert("Something went wrong");
                navigate("/adminlogin");
            }
        })
        .catch((err)=>{
           
        })
        setEmail("")
        setPassword("")
    }


  return (
    <div className='flex h-screen w-full  max-sm:h-screen max-sm:w-full items-center justify-center'>
        <div className='border-2 rounded-xl max-sm:w-11/12 border-red-600 p-20'>
            <div className='flex flex-col items-center justify-center'>
                <input 
                value={email}
                onChange={(e)=>{
                    setEmail(e.target.value)
                }}
                required 
                className='outline-none bg-transparent border-2 border-red-600 font-medium text-lg py-2 px-6 rounded-full placeholder:text-gray-400' type="email" placeholder='Enter your email' 
                />
                <input
                value={password}
                onChange={(e)=>{
                    setPassword(e.target.value)
                }}
                required 
                className='outline-none bg-transparent border-2 border-red-600 font-medium text-lg py-2 px-6 rounded-full mt-3 placeholder:text-gray-400' type="password" placeholder='Enter password' />
                <button onClick={submitlogin} className='mt-7 text-white border-none outline-none hover:bg-red-700 font-semibold bg-red-600 text-lg py-2 px-8 w-full rounded-full placeholder:text-white'>Log in</button>
                <div className='flex mt-2 gap-2 max-sm:text-nowrap max-sm:mt-4'><p>Don't have an account ?</p> <Link to={"/adminsignup"}><p className='text-blue-600 cursor-pointer'>Signup</p></Link></div>
            </div>
        </div>
    </div>
  )
}

export default Login