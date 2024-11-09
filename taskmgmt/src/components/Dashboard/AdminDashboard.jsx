import React, { useEffect } from 'react'
import CreateTask from '../other/CreateTask'
import { useNavigate } from 'react-router-dom'

const AdminDashboard = () => {
    const navigate= useNavigate();
    useEffect(()=>{
        if(!localStorage.getItem("token")){
            alert('Something went Wrong please Re-login....')
            navigate("/adminlogin");
        }
    })
    return (
        <div className='h-screen w-full max-sm:h-screen max-sm:w-full p-7'>
            <CreateTask/>
        </div>
    )
}

export default AdminDashboard