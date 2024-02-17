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
import React, { useEffect, useState } from "react";
import { CodeEditor, Compiler, SideMenu } from "../Components";
import { languages, programmingLanguages } from "@/Constants";
import { useMutation } from "@/liveblocks.config";

const CodeEditorLayout = () => {
  const [language, setLang] = useState({
    displayName: "javascript",
    defaultCode: "",
    name: "script.js",
    stdin: null,
  });

  const handleChangeInlanguage= useMutation(({storage})=>{
        const code = storage.get("code");
        code.set("content",language.defaultCode);
        code.set("language",language.displayName);
        code.set("name",language.name);
        code.set("stdin",language.stdin);
      },[language]);

  const handleValueChange = (selectedValue) => {
    const selectedLang = programmingLanguages[selectedValue];
    setLang({
      displayName: selectedLang.displayName,
      defaultCode:selectedLang.defaultCode,
      name: selectedLang.defaultFileName,
      stdin: null,
    });
    handleChangeInlanguage();
  };

  useEffect(() => {
    handleChangeInlanguage();
  },[language]);

  return (
    <div className="w-full h-full bg-black text-white overflow-hidden">
      <div className="w-full h-[50px] text-white bg-slate-800 flex items-center px-5 gap-10">
        <h1 className="text-2xl">Codex</h1>
        <Select onValueChange={handleValueChange}>
          <SelectTrigger className="w-[150px] bg-transparent ">
            <SelectValue placeholder="Javascript" />
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem
                className="capitalize"
                key={lang.name}
                value={lang.value}
              >
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
        <div className="w-[100%] h-full">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel className=" px-2 py-1 flex item-center justify-center">
              <CodeEditor
                lang={language.displayName} 
              />
            </ResizablePanel>
            <ResizableHandle />
            {/* Compiler section start */}
            <ResizablePanel>
              <Compiler/>
            </ResizablePanel>
            {/* Compiler section end */}
          </ResizablePanelGroup>
        </div>
      </div>
      {/* Code editor section ends */}
    </div>
  );
};

export default CodeEditorLayout;
