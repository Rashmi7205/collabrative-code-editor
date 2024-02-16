"use client";
import { useMutation,useStorage } from '@/liveblocks.config';
import { dracula } from '@uiw/codemirror-theme-dracula';
import ReactCodeMirror from '@uiw/react-codemirror';
import React from 'react'
import { loadLanguage,langNames } from '@uiw/codemirror-extensions-langs';

type Props = {
  lang:string
}

const CodeEditor = ({lang}:Props) => {
  console.log(langNames)
  const value = useStorage((storage)=>storage.code.value);
  
  const handleUpdate = useMutation(({storage},val)=>{
    const code = storage.get('code');
    code.set('value',val);
  },[]);

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