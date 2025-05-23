import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import ContactForm from "./EnqForm";
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
        <div className=" bg-[#622486] gap-20 text-black description md:h-full h-[270vh] md:flex [clip-path:polygon(0%_0%,100%_0%,100%_80%,50%_90%,0%_100%)]">
          <h1 className="font-dis flex flex-col md:ml-10 ml-0 md:mt-0 mt-[300px] md:mb-0 mb-10 items-center justify-center md:text-[5rem] text-[9rem] text-white ">
            <div className=" camp text-[#ffb800] md:mb-[-50px] mb-0">
              Campus
            </div>
            <div className="text-[#cdcabb]">
              <div ref={contwoRef} className=" inline-block">
                C
              </div>
              onnect
            </div>
          </h1>
          <ContactForm />
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
        <Review />
      </div>
    </>
  );
}
