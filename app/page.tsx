import HomeLayout from "./layouts/HomeLayout";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <main
    className="w-full flex flex-col text-white"
    >
     <HomeLayout/>
     <Toaster
     position="bottom-right"
     />
    </main>
  );
}
