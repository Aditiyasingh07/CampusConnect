import react from "react";
import relogo from "/src/assets/review.png";
import Navbar from "../Navbar/Navbar";

export default function Review() {
  return (
    <>
      <Navbar />
      <div className="w-full h-screen m-auto md:mt-0 mt-[2550px] bg-[#f5f5f5]">
        <h1 className=" md:text-5xl text-[8rem] font-extrabold flex text-black justify-center pt-40 mb-30 tracking-widest">
          REVIEW
        </h1>
        <div className=" flex flex-wrap md:w-[60%] w-full m-auto gap-10 md:px-20 px-0 text-center justify-center">
          <div className="flex flex-col p-5 rounded-3xl justify-center items-center bg-[#119CFDFF] w-1/2 md:h-[300px] h-[500px]">
            <img className="rounded-full" src={relogo} width="100px"></img>
            <h1 className=" md:text-[16px] text-[4rem] font-bold text-white mb-3">
              Rahul Singh
            </h1>
            <p className=" text-white md:text-sm text-[3rem] md:p-0 p-1">
              this is my world and i own this world.this is my world and i own
              this world.
            </p>
          </div>
          <div className="flex flex-col p-5 rounded-3xl justify-center items-center bg-[#119CFDFF] w-1/3 md:h-[300px] h-[500px]">
            <img className="rounded-full" src={relogo} width="100px"></img>
            <h1 className=" md:text-[16px] text-[4rem] font-bold text-white mb-3">
              Rahul Singh
            </h1>
            <p className=" text-white md:text-sm text-[3rem] md:p-0 p-1">
              this is my world and i own this world.
            </p>
          </div>
          <div className="flex flex-col p-5 rounded-3xl justify-center items-center bg-[#119CFDFF] w-1/3 md:h-[300px] h-[500px]">
            <img className="rounded-full" src={relogo} width="100px"></img>
            <h1 className=" md:text-[16px] text-[4rem] font-bold text-white mb-3">
              Rahul Singh
            </h1>
            <p className=" text-white md:text-sm text-[3rem] md:p-0 p-1">
              this is my world and i own this world.
            </p>
          </div>
          <div className="flex flex-col p-5 rounded-3xl justify-center items-center bg-[#119CFDFF] w-1/2 md:h-[300px] h-[500px]">
            <img className="rounded-full" src={relogo} width="100px"></img>
            <h1 className=" md:text-[16px] text-[4rem] font-bold text-white mb-3">
              Rahul Singh
            </h1>
            <p className=" text-white md:text-sm text-[3rem] md:p-0 p-1">
              this is my world and i own this world.this is my world and i own
              this world.
            </p>
          </div>
          <div className="flex flex-col p-5 rounded-3xl justify-center items-center bg-[#119CFDFF] w-1/2 md:h-[300px] h-[500px]">
            <img className="rounded-full" src={relogo} width="100px"></img>
            <h1 className=" md:text-[16px] text-[4rem] font-bold text-white mb-3">
              Rahul Singh
            </h1>
            <p className=" text-white md:text-sm text-[3rem] md:p-0 p-1">
              this is my world and i own this world.this is my world and i own
              this world.
            </p>
          </div>
        </div>
        <div className=" w-full h-5 mt-2"></div>
      </div>
    </>
  );
}
