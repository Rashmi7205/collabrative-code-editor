"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { MdOutlineMenu } from "react-icons/md";

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="w-4/5 p-3 backdrop-blur-xl bg-slate-400 rounded-full mx-auto my-3 sticky top-4 flex items-center justify-around text-black font-bold">
      {/* logo  */}
      <Image src="/images/logo.png" alt="byte-code" width={150} height={120} />
      {/* desktop navigation */}
      <div className="hidden h-full md:flex items-center justify-around gap-10 ">
        <Link href="/about">About us</Link>
        <Link href="/features">Features</Link>
        <Link href="/onboard">Code Now</Link>
        <a target="_blank" rel="noopener noreferrer" href="#">
          <FaGithub className="text-3xl" />
        </a>
        <a target="_blank" rel="noopener noreferrer" href="#">
          <FaLinkedin className="text-3xl" />
        </a>
      </div>
      {/* mobile navigation */}

      <button
      className="border-2-gray p-2 text-[25px] block md:hidden"
      onClick={() => setIsOpen(true)}>
        <MdOutlineMenu />
      </button> 
      <div
        className={`w-4/5 flex flex-col items-start absolute top-0 bg-slate-800 h-[100vh] z-50 ${
          isOpen ? "right-0" : "right-[-100%] hidden"
        } transition-all duration-400 gap-7 px-10`}
      >
        <button 
        className="border-2-gray p-2 text-[25px] block"
        onClick={() => setIsOpen(false)}>
          <IoMdCloseCircle />
        </button>
        <Link href="/about">About us</Link>
        <Link href="/features">Features</Link>
        <Link href="/onboard">Code Now</Link>
        <a target="_blank" rel="noopener noreferrer" href="#">
          <FaGithub className="text-3xl" />
        </a>
        <a target="_blank" rel="noopener noreferrer" href="#">
          <FaLinkedin className="text-3xl" />
        </a>
      </div>
    </div>
  );
};

export default Navbar;
