import React, {  useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import AllTask from './AllTask'

const CreateTask = () => {

    const [taskTitle, setTaskTitle] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const [taskDate, setTaskDate] = useState('')
    const [asignTo, setAsignTo] = useState()
    const [category, setCategory] = useState('')
    const [status,setstatus]=useState('pending');   


    const refresh=()=>{
        window.location.reload();
    }

    const navigate=useNavigate();
    const [users,setusers]=useState([]); 
    
    useEffect(()=>{
        const headers={
            token:localStorage.getItem("token")
          }
        axios.get("http://localhost:7000/userdata",{headers})
        .then((res)=>{
            setusers(res.data);
        }).catch((err)=>{
            alert("something went wrong");
            navigate('/adminlogin')
        })
    },[]);



    const handletask=(e)=>{
        e.preventDefault();
        const headers={
            token:localStorage.getItem("token")
          }
            const data={title:taskTitle,description:taskDescription,date:taskDate,asign:asignTo,category:category,status:status};
            axios.post('http://localhost:7000/createtask',data,{headers})
            .then((res)=>{
                console.log(res);
                if(res.data.message==="task created"){
                    alert("Task assigned");
                    refresh();
                }else{
                    alert("something went wrong in creating");
                    refresh();
                }
                setTaskTitle("");
                setTaskDescription("");
                setTaskDate("");
                setCategory("");
                setAsignTo('');
                setstatus("");
            })
            .catch((err)=>{
            })       
    }

    const signout=()=>{
        localStorage.clear();
        window.localStorage.clear();
        navigate("/adminlogin");
      }

    return (
        <>
        <div className='flex items-end justify-between p-5 max-sm:w-full max-sm:flex max-sm:p-2'>
   <span className='text-3xl font-semibold'>Admin Panel</span>
        <button onClick={signout} className='bg-red-600 text-base font-medium text-white px-5 py-2 rounded-sm max-sm:px-2 max-sm:py-1'>Log Out</button>
    </div>
        <div className='p-5 bg-[#1c1c1c] mt-5 rounded'>
            <div className='flex flex-wrap w-full items-start justify-between max-sm:flex-col max-sm:w-full max-sm:flex-nowrap max-sm:items-center max-sm:justify-center'>
                <div className='w-1/2'>
                    <div>
                        <h3 className='text-sm text-gray-300 mb-0.5'>Task Title</h3>
                        <input
                            value={taskTitle}
                            onChange={(e) => {
                                setTaskTitle(e.target.value)
                            }}
                            className='text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4 max-sm:w-full' type="text" placeholder='Make a UI design'
                        />
                    </div>
                    <div>
                        <h3 className='text-sm text-gray-300 mb-0.5'>Date</h3>
                        <input
                            value={taskDate}
                            onChange={(e) => {
                                setTaskDate(e.target.value)
                            }}
                            className='text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4 max-sm:w-full' type="date" />
                    </div>
                    <div>
                        <h3 className='text-sm text-gray-300 mb-0.5'>Asign to</h3>
                        <select value={asignTo} required onChange={(e) => {
                                setAsignTo(e.target.value)
                            }} className='text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4 max-sm:w-full'><option value={""}>Select Employees</option>
                            {
                                users.map((user)=>{
                                  return (
                                  <>
                                  <option className='bg-zinc-900 max-sm:w-full' value={`${user.name}`}>{user.name}</option>
                                  </>)
                                })
                            }
                        </select>
                    </div>
                    <div>
                        <h3 className='text-sm text-gray-300 mb-0.5'>Category</h3>
                        <input
                            value={category}
                            onChange={(e) => {
                                setCategory(e.target.value)
                            }}
                            className='text-sm py-1 max-sm:w-full px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4' type="text" placeholder='design, dev, etc' />
                    </div>
                </div>

                <div className='w-2/5 max-sm:w-full max-sm:flex max-sm:justify-center max-sm:items-center flex flex-col items-start'>
                    <h3 className='text-sm text-gray-300 mb-0.5'>Description</h3>
                    <textarea value={taskDescription}
                        onChange={(e) => {
                            setTaskDescription(e.target.value)
                        }} className='w-full h-44 max-sm:w-11/12 text-sm py-2 px-4 rounded outline-none bg-transparent border-[1px] border-gray-400' name="" id=""></textarea>
                    <button onClick={handletask} className='bg-red-500 py-3 hover:bg-red-600 px-5 rounded text-sm mt-4 w-full max-sm:py-1 max-sm:w-1/2'>Create Task</button>
                </div>

            </div>
        </div>
        <AllTask/>
        </>
    )
}

export default CreateTask