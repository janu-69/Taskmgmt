import React, { useEffect, useState } from 'react'
import axios from "axios"

const AllTask = () => {

const [data,setdata]=useState([]);
const [modify,setmodify]=useState([]); 
const refresh=()=>{
  window.location.reload();
}

  useEffect(()=>{
    const headers={
      token:localStorage.getItem("token")
    }
    axios.get("http://localhost:7000/gettasks",{headers})
    .then((res)=>{
      setdata(res.data);
    })
    .catch((err)=>{

    })
  },[])

 const handledelete=()=>{
  const headers={
    token:localStorage.getItem("token")
  }
    axios.post("http://localhost:7000/deletetasks",modify,{headers})
    .then((res)=>{
        if(res.data.message==="tasks deleted"){
          alert("Task Deleted Successfully");
          refresh()
        }
        else{
          alert("Something went Wrong")
        }
    })
    .catch((err)=>{
        console.log(err)
    })
 }

   
  return (
    <>
   <div className='bg-[#1c1c1c] p-10 max-sm:p-3 rounded mt-5 flex flex-col max-sm:w-full'>
   <div className='w-full flex justify-end max-sm:flex max-sm:justify-center max-sm:w-full max-sm:items-center'><button className='bg-red-600 w-52 px-6 py-1 rounded-lg cursor-pointer ' onClick={handledelete}>DeleteTasks</button></div>
        <div className='bg-red-400 mb-2 py-4 px-4 flex justify-between rounded mt-5 max-sm:flex max-sm:justify-between max-sm:items-center max-sm:pl-1 max-sm:py-1'>
            <h2 className='text-lg font-medium w-1/5 max-sm:text-sm'>Employee</h2>
            <h3 className='text-lg font-medium w-1/5 max-sm:text-sm'>Tasks</h3>
            <h5 className='text-lg font-medium w-1/5 max-sm:text-sm'>Status</h5>
            <h5 className='text-lg font-medium w-1/5 max-sm:text-sm'>Delete</h5>
        </div>
        <div>
        {
          data.map((item)=>{
            return(
              
                <div className=' border-2 border-red-500 mb-2 py-2 px-4 flex justify-between rounded max-sm:px-1'>
            <h3 className='text-lg font-medium w-1/5 text-blue-400 max-sm:text-sm '>{item.asign}</h3>
            <h5 className='text-lg font-medium w-1/5 text-yellow-400 max-sm:text-sm '>{item.title}</h5>
           <h5 className='text-lg font-medium w-1/5 text-white max-sm:text-sm '>{item.status}</h5>
           <input className='w-1/5 h-5' type='checkbox'onChange={(e)=>{
            if(e.target.checked===true){
              setmodify([...modify,item._id]);
            }
            else{
              setmodify(modify.filter(s=> s !== item._id));
            }
           }} ></input>
           </div>
            )
          })
        }
        </div>
      </div>
    </>
  )
}

export default AllTask