import Image from "next/image";
import { CodeEditor, Navbar } from "./Components";
import { Room } from "./Room";
import Link from "next/link";
import HomeLayout from "./layouts/HomeLayout";

export default function Home() {
  return (
    <main
    className="w-full flex flex-col text-white"
    >
     <HomeLayout/>
    </main>
  );
}
