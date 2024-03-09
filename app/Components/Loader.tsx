import Image from "next/image";

const Loader = ({text,color}:{text:string,color:string}) => {
  return (
      <div className="loader flex w-full h-full items-center gap-2">
        <Image
        alt="loader"
        src={color==="white"?"/images/tube-spinner -white.svg":"/images/tube-spinner.svg"}
        height={25}
        width={25}
        />
        <p>{text}</p>
      </div>
  );
};

export default Loader;
