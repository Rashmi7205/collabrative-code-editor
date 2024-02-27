"use client";
import React, { FormEvent, ChangeEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import "@/app/globals.css";
import Appwrite from "@/utils/appwrite";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isLoading,setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (userData.email === "" || userData.password === "") {
      toast.error("Please fill out all fields.");
      return; // Add a return statement to stop the function execution
    }
    try {
      const user = await Appwrite.createUserAccount(userData);
      if(user){
        setIsLoading(false);
        toast.success("Account created successfully");
        router.push('/');
      }
    } catch (error) {
      console.error(error);
    }finally{
        setIsLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-around gap-12 bg-slate-50 rounded-lg shadow-lg px-10 py-5"
      >
        <h1 className="text-2xl">Login Here</h1>
        <label htmlFor="name">Username</label>
        <input
          onChange={handleInputChange}
          className="input-box"
          type="text"
          name="name"
          placeholder="Username"
        />
        <label htmlFor="email">Email</label>
        <input
          onChange={handleInputChange}
          className="input-box"
          type="email"
          name="email"
          placeholder="Email"
        />
        <label htmlFor="password">Password</label>
        <input
          onChange={handleInputChange}
          className="input-box"
          type="password"
          name="password"
          placeholder="password"
        />
        <button
          type="submit"
          className="px-10 py-3 bg-blue-500 text-white font-bold border-none rounded-lg shadow-lg"
        >
         {isLoading?"Wait creating account!" :"Sign up"}
        </button>
      </form>
      <Toaster position="bottom-right" />
    </div>
  );
};

export default Page;
