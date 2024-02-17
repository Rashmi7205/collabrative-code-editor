"use client";

import { useStorage } from "@/liveblocks.config";
import { compileCode } from "@/utils/complie";
import { useState } from "react";


const Compiler = () => {
  const code = useStorage((storage)=>storage.code);
  const [res,setRes] = useState("Get the output Here...");
  const [isLoadding,setIsloadding] = useState(false);
  const handleCompilation = async()=>{
      try {
          setIsloadding(true);
         const res = await compileCode(code);
         setRes(res?.stdout);
         setIsloadding(false);
      } catch (error) {
        console.log(error);
      }
  }
    return (
    <div className="w-full h-full bg-slate-700 p-3 flex flex-wrap items-center justify-around gap-10">
        <div className="w-full h-[45%] bg-slate-800 flex flex-col items-center justify-around py-5">
        <button 
        disabled={isLoadding?true:false}
        onClick={handleCompilation}
        className="w-4/5  inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500">
          {
            isLoadding ? "Compiling....":"Compile"
          }
        </button>
        <div className="w-4/5 h-4/5">
         {res}
        </div>
        </div>
        <div className="w-full h-[45%] bg-slate-800">
            input
        </div>
    </div>
  )
}

export default Compiler