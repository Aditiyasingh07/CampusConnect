import react from "react";
import relogo from "/src/assets/review.png"

export default function Review() {
  return (
    <>
      <div className="w-full h-screen m-auto bg-[#f5f5f5]">
        <h1 className=" text-5xl font-extrabold flex text-black justify-center pt-40 mb-30  tracking-widest">
          REVIEW
        </h1>
        <div className=" flex flex-wrap w-[60%] m-auto gap-10 px-20 text-center justify-center">
          <div className="flex flex-col p-5 rounded-3xl justify-center items-center bg-[#119CFDFF] w-1/2 h-[300px]">
            <img
              className="rounded-full"
              src={relogo}
              width="100px"
            ></img>
            <h1 className=" text-[16px] font-bold text-white mb-3">
              Rahul Singh
            </h1>
            <p className=" text-white text-sm">
              this is my world and i own this world.this is my world and i own
              this world.
            </p>
          </div>
          <div className="flex flex-col p-5 rounded-3xl justify-center items-center bg-[#119CFDFF] w-1/3 h-[300px]">
            <img
              className="rounded-full"
              src={relogo}
              width="100px"
            ></img>
            <h1 className=" text-[16px] font-bold text-white mb-3">
              Rahul Singh
            </h1>
            <p className=" text-white text-sm">
              this is my world and i own this world.this is my world and i own
              this world.
            </p>
          </div>
          <div className="flex flex-col p-5 rounded-3xl justify-center items-center bg-[#119CFDFF] w-1/3 h-[300px]">
            <img
              className="rounded-full"
              src={relogo}
              width="100px"
            ></img>
            <h1 className=" text-[16px] font-bold text-white mb-3">
              Rahul Singh
            </h1>
            <p className=" text-white text-sm">
              this is my world and i own this world.this is my world and i own
              this world.
            </p>
          </div>
          <div className="flex flex-col p-5 rounded-3xl justify-center items-center bg-[#119CFDFF] w-1/2 h-[300px]">
            <img
              className="rounded-full"
              src={relogo}
              width="100px"
            ></img>
            <h1 className=" text-[16px] font-bold text-white mb-3">
              Rahul Singh
            </h1>
            <p className=" text-white text-sm">
              this is my world and i own this world.this is my world and i own
              this world.
            </p>
          </div>
          <div className="flex flex-col p-5 rounded-3xl justify-center items-center bg-[#119CFDFF] w-1/2 h-[300px]">
            <img
              className="rounded-full"
              src={relogo}
              width="100px"
            ></img>
            <h1 className=" text-[16px] font-bold text-white mb-3">
              Rahul Singh
            </h1>
            <p className=" text-white text-sm">
              this is my world and i own this world.this is my world and i own
              this world.
            </p>
          </div>
          <div className="flex flex-col p-5 rounded-3xl justify-center items-center bg-[#119CFDFF] w-1/3 h-[300px]">
            <img
              className="rounded-full"
              src={relogo}
              width="100px"
            ></img>
            <h1 className=" text-[16px] font-bold text-white mb-3">
              Rahul Singh
            </h1>
            <p className=" text-white text-sm">
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
