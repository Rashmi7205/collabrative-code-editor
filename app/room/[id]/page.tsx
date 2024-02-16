import React from "react";
import { Room } from "../Room";
import CodeEditorLayout from "@/app/layouts/CodeEditorLayout";

function page() {
  return (
    <div className="w-full h-screen flex">
      <Room>
        <CodeEditorLayout />
      </Room>
    </div>
  );
}

export default page;
