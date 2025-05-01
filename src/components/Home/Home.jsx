import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import Events from "../Events/Events";
import Memories from "../Memories/Memories";
import Navbar from "../Navbar/Navbar";
import Review from "../Review/Review";

export default function Home() {
  const contwoRef = useRef(null);

  useEffect(() => {
    gsap.to(contwoRef.current, {
      rotationZ: "360",
      duration: 5,
      repeat: -1,
      yoyo: true,
    });
  });

  const textRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      textRef.current,
      { x: "100%" },
      { x: "-100%", duration: 10, repeat: -1, ease: "linear" }
    );
  }, []);

  return (
    <>
      <Navbar />
      <div className="md:w-full w-[400%]">
        <div className=" bg-[#622486] gap-20 text-black description md:h-full h-[220vh] md:flex [clip-path:polygon(0%_0%,100%_0%,100%_80%,50%_90%,0%_100%)]">
          <h1 className="font-dis flex flex-col md:ml-10 ml-0 md:mt-0 mt-[300px] md:mb-0 mb-10 items-center justify-center md:text-[5rem] text-[9rem] text-white ">
            <div className=" camp text-[#ffb800] md:mb-[-50px] mb-0">
            Campus 
            </div>
            <div className="text-[#cdcabb]">
            <div ref={contwoRef} className=" inline-block">C</div>onnect
            </div>
          </h1>
          <form
            action="https://formspree.io/f/movdvgvp"
            method="POST" 
          className="bg-gradient-to-t rounded-2xl from-[#119CFDFF] to-[#622486] md:w-[50%] w-[80%] m-auto md:mt-30 mt-20">
            <div className="flex flex-col md:gap-5 gap-5 rounded-3xl px-5 py-10 justify-center items-center md:mt-[-10px] mt-0">
              <input
                type="text"
                placeholder="Enter your name"
                className="md:w-[30rem] w-[60rem] md:h-[3rem] h-[7rem] md:text-xl text-5xl rounded-2xl p-2 pl-7 text-white border-gray-200 border-2"
              />
              <input
                type="number"
                placeholder="Enter your phone no."
                className="md:w-[30rem] w-[60rem] md:h-[3rem] h-[7rem] md:text-xl text-5xl rounded-2xl p-2 pl-7 text-white border-gray-200 border-2"
              />
              <input
                type="email"
                placeholder="Enter your email"
                className="md:w-[30rem] w-[60rem] md:h-[3rem] h-[7rem] md:text-xl text-5xl rounded-2xl p-2 pl-7 text-white border-gray-200 border-2"
              />
              <textarea
                placeholder="Enter your message"
                className="md:w-[30rem] w-[60rem] md:h-[5rem] h-[10rem] md:text-xl text-5xl rounded-2xl p-2 pl-7 text-white border-gray-200 border-2"/>
              <button type="submit" className="bg-[#ffb800] text-black font-dis md:w-[10rem] w-[18rem] md:h-[3rem] h-[7rem] rounded-full md:text-2xl text-5xl ml-2 md:mt-0 mt-5">
                Enquiry
              </button>
            </div>
          </form>
        </div>
        <div className="relative w-full overflow-hidden  ">
          <div className="absolute h-full" />
          <div
            className="whitespace-nowrap font-dis bg-gradient-to-r from-blue-600 via-red-400 to-pink-800 text-transparent bg-clip-text
            md:w-[130%] w-[345%] tracking-widest md:text-5xl text-[10rem] font-bold flex "
            ref={textRef}
          >
            AVVIARE EDUCATIONAL HUB, NOIDA SECTOR - 62
          </div>
        </div>
        <Events /> 
        <Memories />
        <Review/>
      </div>
    </>
  );
}
