"use client";
import React, { ReactNode } from "react";
import toast from "react-hot-toast";
import '@/app/globals.css';
import appwrite from "@/utils/appwrite";
import { useState } from "react";

const page = () => {

  const [userData, setUserData] = useState({
    name:"",
    email:"",
    password:"",
  });

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    console.log("Submit");
    if(userData.email === "" || userData.password === "") 
    {
      toast.error("Please fill out all fields.");
    }
    
  }

  const handleInputChange = (e:ReactNode)=>{
      setUserData({
        ...userData,
        [e.target.name]: e.target.value
      })
  }

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <form 
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-around gap-12 bg-slate-50 rounded-lg shadow-lg px-10 py-5 ">
        <h1 className="text-2xl ">Login Here </h1>
        <label htmlFor="name">Username</label>
        <input 
        onChange={handleInputChange}
        className="input-box" type="text" name="name" placeholder="Username" />
        <label htmlFor="email">Email</label>
        <input 
          onChange={handleInputChange} 
        className="input-box" type="email" name="email" placeholder="Email" />
        <label htmlFor="password">Password</label>
        <input 
        onChange={handleInputChange} 
        className="input-box" type="password"  name="password" placeholder="password" /> 
        <button 
        type="submit"
        className="px-10 py-3 bg-blue-500 text-white font-bold  border-none rounded-lg  shadow-lg">
          Sign up
        </button>
      </form>
      
    </div>
  );
};

export default page;
