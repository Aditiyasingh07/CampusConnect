import react from "react";
import { Link } from "react-router-dom";
import "/src/App.css";

export default function Memories() {
  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center pb-40">
        <h1 className=" md:text-5xl text-[8rem] font-extrabold text-black flex justify-center pt-30 pb-40  tracking-widest">
          MEMORIES
        </h1>
        <div className=" flex flex-wrap justify-center gap-15 w-full h-full items-center px-50">
          <div className=" memo flex flex-col justify-center items-center bg-conic-180 from-green-800 via-indigo-50 to-green-800 md:h-60 h-[500px] md:w-[30%] w-[90%] text-black font-bold rounded-4xl">
            <h1 className=" text-gray-700 md:text-2xl text-[6rem]">IT Fest</h1>
            <Link to="/itfest">
              <buttom className=" text-white p-3 font-bold md:text-xl text-[3rem] rounded-3xl">
                View More
              </buttom>
            </Link>
          </div>
          <div className=" memo flex flex-col justify-center items-center bg-conic-180 from-red-800 via-indigo-50 to-red-800 md:h-60 h-[500px] md:w-[30%] w-[90%] text-black font-bold rounded-4xl ">
            <h1 className=" text-gray-700 md:text-2xl text-[6rem]">Cricket</h1>
            <Link to="/cric">
              <buttom className=" text-white p-3 font-bold rounded-3xl md:text-xl text-[3rem]">
                View More
              </buttom>
            </Link>
          </div>
          <div className=" memo flex flex-col justify-center items-center bg-conic-180 from-yellow-800 via-indigo-50 to-yellow-800 md:h-60 h-[500px] md:w-[30%] w-[90%] text-black font-bold rounded-4xl">
            <h1 className=" text-gray-700 md:text-2xl text-[6rem]">Olympia</h1>
            <Link to="/olp">
              <buttom className=" text-white p-3 font-bold rounded-3xl md:text-xl text-[3rem]">
                View More
              </buttom>
            </Link>
          </div>
          <div className=" memo flex flex-col justify-center items-center bg-conic-180 from-indigo-800 via-indigo-50 to-indigo-800 md:h-60 h-[500px] md:w-[30%] w-[90%] text-black font-bold rounded-4xl ">
            <Link to="/all">
              <buttom className=" text-white p-3 md:text-2xl text-[4rem] font-bold rounded-3xl">
                All Memories
              </buttom>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
