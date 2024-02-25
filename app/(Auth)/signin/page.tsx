"use client";
import React from "react";
import '@/app/globals.css';
import appwrite from "@/utils/appwrite";
import { useState } from "react";
import Link from "next/link";

const page = () => {

  const [userData, setUserData] = useState({
    email:"",
    password:"",
  });

  const handleSubmit = ()=>{
    if(userData.email === "" || userData.password === "") return;
    
  }

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <form className="flex flex-col items-center justify-around gap-12 bg-slate-50 rounded-lg shadow-lg px-10 py-5 ">
        <h1 className="text-2xl ">Login Here </h1>
        <label htmlFor="email">Email</label>
        <input className="input-box" type="email" name="email" placeholder="Email" />
        <label htmlFor="password">Password</label>
        <input className="input-box" type="password"  name="password" placeholder="password" />
        <Link href="signup">
          Sign up here
        </Link>
      </form>
     
    </div>
  );
};

export default page;
