import { GlassCards, Navbar } from "../Components";

const HomeLayout = () => {
  const getUserProfile = async ()=>{
        try {
            
        } catch (error:any) {
          
        }
  }

  return (
    <div className="w-full flex flex-col items-center ">
      <Navbar />
      {/* Landing Section */}
      <div className="w-full h-[90vh] relative">
        <div className="gradient w-full h-full absolute top-[20%] left-[30%]"></div>
        <div className="w-full h-full text-black absolute top-0 left-0 flex item-center justify-center">
          <h1 className="text-2xl md:text-5xl my-[200px] text-center font-semibold line-clamp-9">
            Welcome to <span className="text-orange-600 font-bold">Byte{"{/}"}Code</span> <br />
             Your Gateway to Seamless Collaboration in
            Coding!
          </h1>
        </div>
      </div>
      {/* Features Section */}
      <GlassCards/>
    </div>
  );
};

export default HomeLayout;
