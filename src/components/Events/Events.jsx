import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EventCard from "../sub-components/event-card/Event-card";
import Navbar from "../Navbar/Navbar"

export default function Events() {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;

    const sections = gsap.utils.toArray(".panel", container);

    const scrollTween = gsap.to(sections, {
      xPercent: -250 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1,
        end: "+=2000",
      },
    });
    return () => {
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <>
    <Navbar/>
      <div ref={containerRef}>
        <h1 className=" text-5xl font-extrabold flex text-black justify-center pt-30  tracking-widest">
          EVENTS
        </h1>
        <div
          className=" flex justify-evenly items-center px-10 w-[300%] h-[700px] ">
          <section className=" bg-[#09191f] panel text-white rounded-[50px] hover:rounded-4xl transition delay-300">
            <EventCard />
          </section>
          <section className="bg-[#153b47] panel text-white rounded-[50px] hover:rounded-4xl transition delay-300">
            <EventCard />
          </section>
          <section className="bg-[#3d606e] panel text-white rounded-[50px] hover:rounded-4xl transition delay-300 ">
            <EventCard />
          </section>
          <section className="bg-[#30535f] text-white relative panel rounded-[50px] hover:rounded-4xl transition delay-300 ">
            <EventCard />
          </section>
        </div>
      </div>
    </>
  );
}
