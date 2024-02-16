import Image from "next/image";
import { CodeEditor, Navbar } from "./Components";
import { Room } from "./Room";
import Link from "next/link";

export default function Home() {
  return (
    <main
    className="w-full flex flex-col text-white"
    >
      <Navbar/>
      {/* <Link href="/CodeEditor"
      className="bg-green-500"
      >Code editor</Link> */}
    </main>
  );
}
