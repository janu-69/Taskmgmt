import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';


const Loginuser = () => {

    

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate =useNavigate();


    const submitlogin = (e)=>{
        e.preventDefault()
        const data={email:email,password:password};
        axios.post("http://localhost:7000/userlogin",data)
        .then((res)=>{
            const name=res.data.name;
            const token=res.data.token;
            window.localStorage.setItem("role",res.data.role);
            localStorage.setItem("token",token);
            localStorage.setItem('name',name);
            if(token){
            navigate(`/employeedashboard`);
            }
            if(res.data.message==="faliure"){
                alert("Something went wrong");
                navigate("/login");
            }
        })
        .catch((err)=>{
        })
        setEmail("")
        setPassword("")
    }


  return (
    <div className='flex h-screen w-full max-sm:h-screen max-sm:w-full items-center justify-center'>
        <div className=' border-2 rounded-xl max-sm:w-11/12 border-emerald-600 p-20'>
            <div className='flex flex-col items-center justify-center'>
                <input 
                value={email}
                onChange={(e)=>{
                    setEmail(e.target.value)
                }}
                required 
                className='outline-none bg-transparent border-2 border-emerald-600 font-medium text-lg py-2 px-6 rounded-full placeholder:text-gray-400' type="email" placeholder='Enter your email' 
                />
                <input
                value={password}
                onChange={(e)=>{
                    setPassword(e.target.value)
                }}
                required 
                className='outline-none bg-transparent border-2  border-emerald-600 font-medium text-lg py-2 px-6 rounded-full mt-3 placeholder:text-gray-400' type="password" placeholder='Enter password' />
                <button onClick={submitlogin} className='mt-7 text-white border-none outline-none hover:bg-emerald-700 font-semibold bg-emerald-600 text-lg py-2 px-8 w-full rounded-full placeholder:text-white'>Log in</button>
                <div className='max-sm:mt-4 max-sm:text-nowrap flex mt-2 gap-2'><p>Don't have an account ?</p> <Link to={"/signup"}><p className='text-blue-600 cursor-pointer'>Signup</p></Link></div>
            </div>
        </div>
    </div>
  )
}

export default Loginuser