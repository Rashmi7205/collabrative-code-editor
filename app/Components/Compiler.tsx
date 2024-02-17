"use client";

import { useMutation, useStorage } from "@/liveblocks.config";
import { compileCode } from "@/utils/complie";
import { useState } from "react";


const Compiler = () => {
  const code = useStorage((storage)=>storage.code);
  const [res,setRes] = useState("Get the output Here...");
  const [isLoadding,setIsloadding] = useState(false);
  
  const handleStdout = useMutation(({storage},stdout)=>{
    const code = storage.get('code');
    code.set('output',stdout);
  },[]);

  const handleStdin = useMutation(({storage},e)=>{
      const code = storage.get('code');
      code.set('stdin',e.target.value);
  },[]);

  const handleCompilation = async()=>{
      try {
          setIsloadding(true);
         const res = await compileCode(code);
         handleStdout(res?.stdout);
         setIsloadding(false);
         handleStdin(null);
      } catch (error) {
        console.log(error);
      }
  }
    return (
    <div className="w-full h-full bg-slate-700 p-3 flex flex-wrap items-center justify-around gap-10">
        <div className="w-full h-[45%] bg-slate-800 flex flex-col items-center justify-around py-5 rounded-lg">
        <button 
        disabled={isLoadding?true:false}
        onClick={handleCompilation}
        className="w-4/5  inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500">
          {
            isLoadding ? "Compiling....":"Compile"
          }
        </button>
        <div className="w-4/5 h-4/5 py-3">
         {
            code.output ? code.output : res
         }
        </div>
        </div>
        <div className="w-full h-[45%] bg-slate-800 flex flex-col items-center justify-around py-5 rounded-lg ">
           <label htmlFor="input"
           className="w-4/5 text-xl"
           >Enter the input values</label>
           <textarea 
           className="text-white w-4/5 h-4/5 bg-slate-500 p-4 rounded-lg resize-none"
           placeholder="Enter the values"
           onChange={handleStdin}
           />
        </div>
    </div>
  )
}

export default Compiler