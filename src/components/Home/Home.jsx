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
      <div className="">
        <div className=" bg-[#622486] text-black description flex [clip-path:polygon(0%_0%,100%_0%,100%_80%,50%_90%,0%_100%)]">
          <h1 className="font-dis flex justify-center text-[5rem] text-white ">
            <div className=" camp text-[#ffb800] mb-[-50px]">
            Campus
            </div>
            <div className="text-[#cdcabb]">
            <div ref={contwoRef} className=" inline-block">C</div>onnect
            </div>
          </h1>
        </div>
        <div className="relative w-full overflow-hidden  ">
          <div className="absolute h-full" />
          <div
            className="whitespace-nowrap font-dis bg-gradient-to-r from-blue-600 via-red-400 to-pink-800 text-transparent bg-clip-text tracking-widest text-5xl font-bold flex "
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
