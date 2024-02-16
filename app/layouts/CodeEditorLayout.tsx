"use client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";
import { CodeEditor, SideMenu } from "../Components";

const CodeEditorLayout = () => {

  const languages = [
    {
      name:"c",
      value:"c"
    },
    {
      name:"c++",
      value:"cpp"
    },
    {
      name:"java",
      value:"java"
    },
    {
      name:"python",
      value:"python"
    }

  ];
  const [lang,setLang] = useState("javascript"); 
  const handleValueChange = (selectedValue) => {
      setLang(selectedValue);
  };

  return (
    <div className="w-full h-full bg-black text-white overflow-hidden">
      <div className="w-full h-[50px] text-white bg-slate-800 flex items-center px-5 gap-10">
        <h1 className="text-2xl">Codex</h1>
        <Select onValueChange={handleValueChange}>
      <SelectTrigger className="w-[150px] bg-transparent ">
        <SelectValue placeholder="Select language" />
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem className="capitalize" key={lang.name} value={lang.value}>
            {lang.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
      </div>
      <div className="w-full h-[90%] flex">
        {/* Side bar menu */}
        <SideMenu />
        {/* side bar menu ends */}
        {/* Code editor body */}
        <div className="w-[90%] h-full">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel className="px-2 py-1 flex item-center justify-center">
              <CodeEditor lang={lang} />
            </ResizablePanel>
            <ResizableHandle />
            {/* Compiler section start */}
            <ResizablePanel>Two</ResizablePanel>
            {/* Compiler section end */}
          </ResizablePanelGroup>
        </div>
      </div>
      {/* Code editor section ends */}
    </div>
  );
};

export default CodeEditorLayout;
