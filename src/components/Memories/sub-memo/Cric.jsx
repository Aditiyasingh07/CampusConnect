import react from "react";

export default function Cric() {
  return (
    <>
      <div className=" flex flex-col justify-center items-center ">
        <img className="w-full h-[742px]" src="/src/assets/cricket.jpeg"></img>
        <div className=" absolute z-30 h-full w-full bg-black opacity-80"></div>
        <div className=" absolute z-40 flex w-[60%] flex-wrap justify-center mt-25 items-center gap-5">
          <h1 className="absolute z-40 text-4xl font-extrabold text-white top-[-100px]">
            CRICKET
          </h1>
          <img
            className="rounded-tl-4xl w-[300px] h-[300px] hover:scale-114 hover:rounded-2xl duration-600"
            src="/src/assets/memo/cri1.jpg"
            alt=""
          />
          <img
            className="rounded-tr-4xl w-[300px] h-[300px] hover:scale-114 hover:rounded-2xl duration-600"
            src="/src/assets/memo/cri2.jpg"
            alt=""
          />
          <img
            className="rounded-bl-4xl w-[300px] h-[300px] mb-5 hover:scale-114 hover:rounded-2xl duration-600"
            src="/src/assets/memo/cri3.jpg"
            alt=""
          />
          <img
            className="rounded-br-4xl w-[300px] h-[300px] mb-5 hover:scale-114 hover:rounded-2xl duration-600"
            src="/src/assets/memo/cri4.jpg"
            alt=""
          />
        </div>
      </div>
    </>
  );
}
