import React from 'react'
import { Link} from 'react-router-dom'

const Home = () => {
  return (
    <>
    <div className='h-screen w-full bg-[#1c1c1c] flex'>
        <h1 className='absolute right-[40%] top-10 text-[3vw] max-sm:text-xl max-sm:absolute font-bold'>Task Management</h1>
        <div className='h-screen w-1/2 bg-green-700 flex justify-center items-center flex-col text-[3vw] font-bold'>
        <h1 className='max-sm:text-sm'>Are you an Employee?</h1>
        <Link to={"/login"}><h1 className='font-bold border-2 bg-black px-1 rounded-lg mt-2 text-[2vw] max-sm:text-sm'>Login</h1></Link>
        
        </div>

        <div className='h-screen w-1/2 bg-red-600 flex justify-center items-center flex-col text-[3vw] font-bold'>
        <h1 className='max-sm:text-sm'>Are u an Admin?</h1>
        <Link to={"/adminlogin"}><h1 className='font-bold border-2 bg-black px-1 rounded-lg mt-2 text-[2vw] max-sm:text-sm'>Login</h1></Link>
        </div>    
    </div>
    
    </>
  )
}

export default Home