import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const EmployeeDashboard = () => {
  const [data,setdata]=useState([]);
  const [name,setname]=useState();
  const [number,setnumber]=useState('');
const navigate=useNavigate();

const refresh=()=>{
  window.location.reload();
}
useEffect(()=>{
  const token=localStorage.getItem("token");
  if(!token){
    alert("Something went wrong Please Re-login...");
    navigate("/login");
  }
},[])

if(number===0){
 const display=document.querySelector("#none");
 display.style.display="block";

}
  useEffect(()=>{
    const name=localStorage.getItem("name");
    setname(name);
    const data={
      name:name
    }
    const headers={
       token:localStorage.getItem("token")
    }
    axios.post("http://localhost:7000/getusertask",data,{headers})
    .then((res)=>{
      console.log(res)
      let tasknumber=res.data.length;
     setnumber(tasknumber);
      setdata(res.data);
      console.log(res)
      
    })
    .catch((err)=>{
      console.log(err.response.data.message)
      if(err.response.data.message==="unauthorised user"){
        alert('token expired')
        navigate('/login');
      }

;    })
  },[])

  const handlepass=(item)=>{  
    const statusid=item._id;
    const data={
      id:statusid,
      status:"success"
    }
    const headers={
      token:localStorage.getItem("token")
   }
      axios.post("http://localhost:7000/updatestatus",data,{headers})
      .then((res)=>{
        console.log(res)
        if(res.data.message){
          alert(res.data.message);
          refresh();
        }
      })
      .catch((err)=>{
        console.log(err);
        alert("Something went wrong");
      })
  }
  const handlefailed=(item)=>{

    const statusid=item._id;
    const data={
      id:statusid,
      status:"Failed",
    }
    const headers={
      token:localStorage.getItem("token")
   }
      axios.post("http://localhost:7000/updatestatus",data,{headers})
      .then((res)=>{
        console.log(res)
        if(res.data.message){
          alert(res.data.message);
          refresh();
        }
      })
      .catch((err)=>{
        console.log(err);
        alert("Something went wrong");
      })
  }

  const handlelogout=()=>{
    localStorage.clear();
    window.localStorage.clear();
    navigate("/login")
  }
  return (
    <>
     <div className='w-full flex items-end justify-between p-16 max-sm:p-10'>
     <div className='flex flex-wrap gap-2 justify-center items-center max-sm:flex max-sm:justify-center max-sm:items-center'> <span className='text-3xl font-semibold'>Welcome</span>
   <p className='text-3xl font-bold text-green-600 uppercase'>{name}</p></div>
   <div className='max-sm:mb-3 max-sm:ml-4'>Total Tasks : {number}</div>
        <button onClick={handlelogout} className='bg-green-600 text-base font-medium text-white px-5 py-2 rounded-sm max-sm:text-nowrap max-sm:px-1 max-sm:py-1 max-sm:mb-5 max-sm:ml-5'>Log Out</button>
    </div>
    <div className='w-full flex flex-col gap-10 justify-center items-center'>
      {
        data.map((item)=>{
         return( 
         <>
          <div className='w-11/12 h-3/6 border-2 border-green-400 p-5'>
            <div>
           <h2 className='text-orange-600'>Title : <span>{item.title}</span></h2>
           <h2 className='text-orange-600'>Description : <span>{item.description}</span> </h2>
           <h2 className='text-orange-600'>Category : <span>{item.category}</span></h2>
           <h2 className='text-orange-600'>Deadline Date : <span>{item.date}</span></h2>
           <h2 className='text-orange-600'>Status : <span>{item.status}</span></h2>
           </div>

           <div className='flex justify-between items-center mt-2'>
            <button onClick={(e)=>handlepass(item)} className='bg-green-600 rounded-md px-5 max-sm:text-nowrap max-sm:px-1 max-sm:py-1'>Mark as Completed</button>
            <button onClick={(e)=>handlefailed(item)} className='bg-red-600 rounded-md px-5 max-sm:text-nowrap max-sm:px-1 max-sm:py-1'>Mark as Failed</button>
            </div>

          </div>
          
          </>
         )
        })
      }

    </div>
    <div id='none' className='text-[20vw] text-center font-bold hidden'>No Tasks</div>
    
    </>
  )
}

export default EmployeeDashboard