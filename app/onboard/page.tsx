"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaArrowRight, FaFileCode } from "react-icons/fa";
import { MdDashboard, MdOutlineHistory } from "react-icons/md";

const page = () => {
  const [greeting, setGreeting] = useState("");
  const [time, setTime] = useState("");
  const [userData,setUserData] = useState("");
  const router= useRouter();

  const userGreeting = ()=>{
    
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    let newGreeting = "";
    if (currentHour < 12) {
      newGreeting = "Good morning,";
    } else if (currentHour < 18) {
      newGreeting = "Good afternoon,";
    } else {
      newGreeting = "Good evening,";
    }
  
    const formattedTime = currentDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  
    setGreeting(newGreeting);
    setTime(formattedTime);
  }

  const getUserData = async ()=>{
      try {
            const {data } = await axios.get('/api/auth/profile',{
              withCredentials:true,
            });
          
          if(!data){
            router.push('/') ;
          }
          setUserData(data);
      } catch (error:any) {
          toast.error(error.message);
          router.push('/sign-in');
       }
  }
  // cretate a data
  const createRoom = async()=>{
      try {
          const {data}=await axios.post("/api/room/",{
            withCredentials:true
          });
          if(!data.room){
              toast.error("Cannot create room");
          }
          console.log(data.room._id);
          router.push(`/room/${String(data.room._id)}`);
      } catch (error:any) {
          toast.error("Error creating room");
      }
  }
  //join a room
  const joinRoom = async()=>{

  }

  useEffect(() => {
    userGreeting();
    getUserData();
  }, []);
  return (
    <div className="w-full flex flex-row  bg-slate-800 h-screen text-white ">
      <div className="w-[15%] h-full bg-slate-900 flex flex-col items-center py-8 gap-10 ">
        {/* logo */}
        <Image
          src="/images/logo.png"
          width={200}
          height={100}
          alt="Bytecode "
        />
        <Button className="bg-white w-4/5 text-black hover:bg-slate-400">
          <MdDashboard className="mr-3 text-xl" />
          Dashboard
        </Button>
        <Button className="bg-white w-4/5 text-black hover:bg-slate-400">
          <MdOutlineHistory className="mr-3 text-xl" />
          History
        </Button>
        <Button className="bg-white w-4/5 text-black hover:bg-slate-400">
          <FaFileCode className="mr-3 text-xl" />
          Saved
        </Button>
      </div>
      <div className="w-[85%] h-full">
        <div className="w-full bg-slate-800 p-8 flex items-center justify-between">
          <Button className="bg-orange-500">
            Code Editor
            <FaArrowRight className="ml-3 text-xl" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="w-full p-4 ">
          <div className="w-full px-10 h-[200px] bg-gradient-to-br from-cyan-400 to-blue-900 flex items-center justify-between rounded-lg text-white">
            <div className="text-left w-2/5">
              <h1 className="text-4xl font-bold">{greeting}
                
                {
                //@ts-ignore
                userData && userData?.user?.username
                }
              </h1>
              <p className="text-lg">{time}</p>
            </div>
            <div className="w-2/5 flex flex-col items-center justify-around">
              <Button onClick={createRoom}>+ Create</Button>
              <Button>Join </Button>
            </div>
          </div>
        </div>
      </div>
      <Toaster/>
    </div>
  );
};

export default page;
