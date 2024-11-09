import React from 'react'
import Signup from './components/Auth/Signup'
import Login from './components/Auth/Login'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import AdminDashboard from './components/Dashboard/AdminDashboard'
import Signupuser from './components/Authuser/Signupuser'
import Loginuser from './components/Authuser/Loginuser'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard'
import NotfoundPage from './components/other/NotfoundPage'
import Home from './Home'

const App = () => {
    const Privatelement=({children})=>{
      const user= localStorage.getItem("role")
      if(user==="admin"){
        return <>{children}</>
      }
      else{
        return(
          <div className='h-screen w-full bg-black flex justify-center items-center text-[7vw] font-bold'>UNAUTHORIZED ACCESS</div>
        )
      }
    }
    const Publicelement=({children})=>{
      const user= localStorage.getItem("role")
      if(user==="user"){
        return <>{children}</>;
      }
      else{
        return(
          <div className='h-screen w-full bg-black flex justify-center items-center text-[7vw] font-bold'>UNAUTHORIZED ACCESS</div>
        )
      }
    }

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path="/adminsignup" element={<Signup/>}></Route>
      <Route path='/adminlogin' element={<Login/>}></Route>
      <Route path='/admindashboard' element={<Privatelement><AdminDashboard/></Privatelement>}></Route>
      <Route path='/signup' element={<Signupuser/>}></Route>
      <Route path='/login' element={<Loginuser/>}></Route>
      <Route path='/employeedashboard' element={<Publicelement><EmployeeDashboard/></Publicelement>}></Route>
      <Route path="*" element={<NotfoundPage/>}></Route>
    </Routes>
    
    </BrowserRouter>
    </>
  )
}

export default App