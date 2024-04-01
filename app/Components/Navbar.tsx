"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Appwrite from "@/utils/appwrite";
import { Code2, LogOut } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
const Navbar = () => {
  const [userData, setUserData] = useState(null);

  // get the current user data if the user is logged in

  const getCurrUser = async () => {
    try {
      const user = await Appwrite.getCurrentUser();
      setUserData(user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrUser();
  },[]);

  return (
    <nav className="w-full bg-transparent border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex  items-center justify-between mx-auto p-2">
        <Link href="/">
          <Image 
          src="/images/logo.png"
          alt="bytecode"
          width={160}
          height={70}
          />
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {userData ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="text-orange-500 font-semibold border-2 border-orange-500 px-5 py-2 rounded-lg">
                {userData?.name}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>
                  <Dialog>
                    <DialogTrigger>Edit</DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently
                          delete your account and remove your data from our
                          servers.
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={async ()=>{
                  await Appwrite.logout();
                  setUserData(null);
                  }} className="bg-red-500 text-white hover:bg-red-800 ">
                  <LogOut />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              href="/sign-in"
              className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
            >
              Get Started
            </Link>
          )}

          <button
            data-collapse-toggle="navbar-cta"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-cta"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-cta"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                href="#"
                className="block py-2 px-3 md:p-0 text-white bg-orange-700 rounded md:bg-transparent md:text-orange-700 md:dark:text-orange-500"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link href="#" className="link">
                About
              </Link>
            </li>
            <li>
              <Link href="#" className="link">
                Services
              </Link>
            </li>
            <li>
              <Link href="#" className="link">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
