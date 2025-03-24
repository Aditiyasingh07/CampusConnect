import react from "react";

export default function ItFest() {
  return (
    <>
      <div className="bg-pink-900 flex flex-col justify-center items-center ">
        <img className="w-full h-[742px]" src="/src/assets/itfest.jpg"></img>
        <div className=" absolute z-30 h-full w-full bg-black opacity-80"></div>
        <div className=" absolute z-40 flex flex-wrap justify-center mt-25 items-center gap-5">
          <h1 className="absolute z-40 text-4xl font-extrabold text-white top-[-100px]">
            IT FEST
          </h1>
          <img
            className="rounded-tl-4xl hover:scale-114 hover:rounded-2xl duration-600"
            src="/src/assets/memo/it1.jpg"
            alt=""
            width="500px"
          />
          <img
            className="rounded-tr-4xl hover:scale-114 hover:rounded-2xl duration-600"
            src="/src/assets/memo/it2.jpg"
            alt=""
            width="500px"
          />
          <img
            className="rounded-bl-4xl hover:scale-114 hover:rounded-2xl duration-600"
            src="/src/assets/memo/it3.jpg"
            alt=""
            width="500px"
          />
          <img
            className="rounded-br-4xl hover:scale-114 hover:rounded-2xl duration-600"
            src="/src/assets/memo/it4.jpg"
            alt=""
            width="500px"
          />
        </div>
      </div>
    </>
  );
}
