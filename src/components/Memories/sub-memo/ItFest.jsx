import react from "react";
import imgone from "../../../memo/it1.jpg"
import imgtwo from "../../../memo/it2.jpg"
import imgthr from "../../../memo/it3.jpg"
import imgfor from "../../../memo/it4.jpg"
import itfestbg from "/src/assets/itfest.jpg"


export default function ItFest() {
  return (
    <>
      <div className=" flex flex-col justify-center items-center ">
        <img className="w-full md:h-[742px] h-[820px]" src={itfestbg}></img>
        <div className=" absolute z-30 h-full w-full bg-black opacity-80"></div>
        <div className=" absolute z-40 flex flex-wrap justify-center mt-25 items-center gap-5">
          <h1 className="absolute z-40 text-4xl font-extrabold text-white md:top-[-100px] top-[-70px]">
            IT FEST
          </h1>
          <img
            className=" md:w-[500px] w-[300px] md:rounded-tl-4xl rounded-2xl hover:scale-114 hover:rounded-2xl duration-600"
            src={imgone}
            alt=""
          />
          <img
            className=" md:w-[500px] w-[300px] md:rounded-tl-4xl rounded-2xl hover:scale-114 hover:rounded-2xl duration-600"
            src={imgtwo}
            alt=""
          />
          <img
            className=" md:w-[500px] w-[300px] md:rounded-tl-4xl rounded-2xl hover:scale-114 hover:rounded-2xl duration-600"
            src={imgthr}
            alt=""
          />
          <img
            className=" md:w-[500px] w-[300px] md:rounded-tl-4xl rounded-2xl hover:scale-114 hover:rounded-2xl duration-600"
            src={imgfor}
            alt=""
          />
        </div>
      </div>
    </>
  );
}
