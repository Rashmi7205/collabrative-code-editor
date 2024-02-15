"use client";
import { useMutation,useStorage } from '@/liveblocks.config';
import { dracula } from '@uiw/codemirror-theme-dracula';
import ReactCodeMirror from '@uiw/react-codemirror';
import React from 'react'
import { javascript } from "@codemirror/lang-javascript";

const CodeEditor = () => {
  
  const value = useStorage((storage)=>storage.code.value);
  
  const handleUpdate = useMutation(({storage},val)=>{
    const code = storage.get('code');
    code.set('value',val);
  },[]);

  return (
    <div className='w-full h-screen'>
      <ReactCodeMirror
      className='text-xl'
      height={'100vh'}
      width={'100vw'}
      theme={dracula}
      value={value}
      onChange={handleUpdate}
      extensions={[javascript({ jsx: true })]}
      />
    </div>
  )
}

export default CodeEditor