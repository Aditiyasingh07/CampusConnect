import react from "react";
import imgone from "../../../memo/cri1.jpg";
import imgtwo from "../../../memo/cri2.jpg";
import imgthr from "../../../memo/cri3.jpg";
import imgfor from "../../../memo/cri4.jpg";
import cricbg from "/src/assets/cricket.jpeg";

export default function Cric() {
  return (
    <>
      <div className=" flex flex-col justify-center md:bg-transparent md:h-full h-[1180px] bg-black items-center md:pt-0 pt-0">
        <img className="w-full md:h-[742px] h-full md:flex hidden" src={cricbg}></img>
        <div className=" absolute z-30 md:h-full h-[1000px] w-full bg-black opacity-80"></div>
        <div className=" absolute z-40 flex md:w-[60%] w-full flex-wrap justify-center mt-25 items-center gap-5">
          <h1 className="absolute z-40 text-4xl font-extrabold text-white md:top-[-100px] top-[-70px]">
            CRICKET
          </h1>
          <img
            className="md:rounded-tl-4xl rounded-2xl md:w-[300px] w-[300px] md:h-[300px] h-[250px] hover:scale-114 hover:rounded-2xl duration-600"
            src={imgone}
            alt=""
          />
          <img
            className="md:rounded-tl-4xl rounded-2xl md:w-[300px] w-[300px] md:h-[300px] h-[250px] hover:scale-114 hover:rounded-2xl duration-600"
            src={imgtwo}
            alt=""
          />
          <img
            className="md:rounded-tl-4xl rounded-2xl md:w-[300px] w-[300px] md:h-[300px] h-[250px] md:mb-5 mb-0 hover:scale-114 hover:rounded-2xl duration-600"
            src={imgthr}
            alt=""
          />
          <img
            className="md:rounded-tl-4xl rounded-2xl md:w-[300px] w-[300px] md:h-[300px] h-[250px] md:mb-5 mb-0 hover:scale-114 hover:rounded-2xl duration-600"
            src={imgfor}
            alt=""
          />
        </div>
      </div>
    </>
  );
}
