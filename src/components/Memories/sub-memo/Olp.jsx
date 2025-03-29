import react from "react";
import imgone from "../../../memo/olp1.jpg"
import imgtwo from "../../../memo/olp2.jpg"
import imgthr from "../../../memo/olp3.jpg"
import imgfor from "../../../memo/olp4.jpg"
import olpbg from "/src/assets/opl.jpg"

export default function Oly() {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <img className=" w-full md:h-[742px] h-[980px]" src={olpbg}></img>
        <div className=" absolute z-30 h-full w-full bg-black opacity-80"></div>
        <div className=" absolute z-40 md:w-[50%] w-full flex flex-wrap justify-center mt-25 items-center gap-5">
          <h1 className="absolute z-40 text-4xl font-extrabold text-white md:pt-0 pt-5 top-[-100px]">
            OLYMPIA
          </h1>
          <img
            className="md:rounded-tl-4xl rounded-2xl md:w-[300px] w-[250px] md:h-[300px] h-[200px] hover:scale-114 hover:rounded-2xl duration-600"
            src={imgone}
            alt=""
          />
          <img
            className="md:rounded-tl-4xl rounded-2xl md:w-[300px] w-[250px] md:h-[300px] h-[200px] hover:scale-114 hover:rounded-2xl duration-600"
            src={imgtwo}
            alt=""
          />
          <img
            className="md:rounded-tl-4xl rounded-2xl md:w-[300px] w-[250px] md:h-[300px] h-[200px] md:mb-5 mb-0 hover:scale-114 hover:rounded-2xl duration-600"
            src={imgthr}
            alt=""
          />
          <img
            className="md:rounded-tl-4xl rounded-2xl md:w-[300px] w-[250px] md:h-[300px] h-[200px] md:mb-5 mb-0 hover:scale-114 hover:rounded-2xl duration-600"
            src={imgfor}
            alt=""
          />
        </div>
      </div>
    </>
  );
}
