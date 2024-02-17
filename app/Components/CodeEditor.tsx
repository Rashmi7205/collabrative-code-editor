"use client";
import { useMutation,useStorage } from '@/liveblocks.config';
import { dracula } from '@uiw/codemirror-theme-dracula';
import ReactCodeMirror from '@uiw/react-codemirror';
import React, { useEffect } from 'react'
import { loadLanguage } from '@uiw/codemirror-extensions-langs';

type Props = {
  lang:string;
  content:string;
}

const CodeEditor = ({lang,}:Props) => {
  const value =  useStorage((storage)=>storage.code.content);

  const handleUpdate = useMutation(({storage},val)=>{
    const code = storage.get('code');
    code.set('content',val);
  },[]);

  useEffect(()=>{
  },[lang]);


  return (
    <div className='w-full h-full rounded-lg overflow-hidden'>
      <ReactCodeMirror
      className='text-xl h-[100%]'
      height={'100%'}
      width={'100%'}
      theme={dracula}
      value={value}
      onChange={handleUpdate}
      extensions={[loadLanguage(lang)]} 
      />
    </div>
  )
}

export default CodeEditor