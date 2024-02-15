import Image from "next/image";
import { CodeEditor } from "./Components";
import { Room } from "./Room";

export default function Home() {
  return (
    <main
    className="w-full flex items-center justify-center h-screen bg-slate-700 text-white"
    >
     <Room>
          <CodeEditor/>
      </Room>
    </main>
  );
}
