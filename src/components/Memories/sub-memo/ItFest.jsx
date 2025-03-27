import react from "react";
import imgone from "/src/assets/memo/it1.jpg"
import imgtwo from "/src/assets/memo/it2.jpg"
import imgthr from "/src/assets/memo/it3.jpg"
import imgfor from "/src/assets/memo/it4.jpg"
import itfestbg from "/src/assets/itfest.jpg"


export default function ItFest() {
  return (
    <>
      <div className="bg-pink-900 flex flex-col justify-center items-center ">
        <img className="w-full h-[742px]" src={itfestbg}></img>
        <div className=" absolute z-30 h-full w-full bg-black opacity-80"></div>
        <div className=" absolute z-40 flex flex-wrap justify-center mt-25 items-center gap-5">
          <h1 className="absolute z-40 text-4xl font-extrabold text-white top-[-100px]">
            IT FEST
          </h1>
          <img
            className="rounded-tl-4xl hover:scale-114 hover:rounded-2xl duration-600"
            src={imgone}
            alt=""
            width="500px"
          />
          <img
            className="rounded-tr-4xl hover:scale-114 hover:rounded-2xl duration-600"
            src={imgtwo}
            alt=""
            width="500px"
          />
          <img
            className="rounded-bl-4xl hover:scale-114 hover:rounded-2xl duration-600"
            src={imgthr}
            alt=""
            width="500px"
          />
          <img
            className="rounded-br-4xl hover:scale-114 hover:rounded-2xl duration-600"
            src={imgfor}
            alt=""
            width="500px"
          />
        </div>
      </div>
    </>
  );
}
