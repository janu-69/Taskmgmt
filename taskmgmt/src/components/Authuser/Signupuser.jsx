import React, { useState } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom';
const Signupuser = () => {
    const [name,setname]=useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const role="user";

   const submitHandler=((e)=>{
    e.preventDefault();
    const data={name:name,email:email,password:password,role:role}
    axios.post("http://localhost:7000/usersignup",data)
    .then((res)=>{
        setname("");
        setEmail("");
        setPassword("");
        alert("User created Successfully");
    })
    .catch((err)=>{
    })
   })

  return (
    
    <div className='flex h-screen w-screen max-sm:h-screen max-sm:w-full items-center justify-center'>
    <div className='border-2 rounded-xl max-sm:w-11/12 border-emerald-600 p-20'>
        <div className='flex flex-col items-center justify-center'>
             <input 
            value={name}
            onChange={(e)=>{
                setname(e.target.value)
            }}
            required 
            className='outline-none bg-transparent border-2 border-emerald-600 mb-3 font-medium text-lg py-2 px-6 rounded-full placeholder:text-gray-400' type="name" placeholder='Enter your name' 
            />
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
            className='outline-none bg-transparent border-2 border-emerald-600 font-medium text-lg py-2 px-6 rounded-full mt-3 placeholder:text-gray-400' type="password" placeholder='Enter password' />
            <button onClick={submitHandler} className='mt-7 text-white border-none outline-none hover:bg-emerald-700 font-semibold bg-emerald-600 text-lg py-2 px-8 w-full rounded-full placeholder:text-white'>Signup</button>
            <div className='flex mt-2 gap-2 max-sm:text-nowrap max-sm:mt-4'><p>Already have an account ?</p> <Link to={"/login"}><p className='text-blue-600 cursor-pointer'>Login</p></Link></div>
        </div>
    </div>
</div>
  )
}

export default Signupuser