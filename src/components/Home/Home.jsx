import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Events from "../Events/Events";
import Memories from "../Memories/Memories";
import Navbar from "../Navbar/Navbar";
// import ""; // Import the CSS file

export default function Home() {
    const containerRef = useRef(null);

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Get the container
    const container = containerRef.current;

    // Sections inside the container
    const sections = gsap.utils.toArray(".panel", container);

    // Main scroll animation
    const scrollTween = gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 0.1,
        end: "+=3000",
      },
    });

    // Box animations
    gsap.set(".box-1, .box-2", { y: 100 });

    gsap.to(".box-1", {
      y: -130,
      duration: 2,
      ease: "elastic",
      scrollTrigger: {
        trigger: ".box-1",
        containerAnimation: scrollTween,
        start: "left center",
        toggleActions: "play none none reset",
        id: "1",
      },
    });

    gsap.to(".box-2", {
      y: -120,
      backgroundColor: "#1e90ff",
      ease: "none",
      scrollTrigger: {
        trigger: ".box-2",
        containerAnimation: scrollTween,
        start: "center 80%",
        end: "center 20%",
        scrub: true,
        id: "2",
      },
    });

    ScrollTrigger.create({
      trigger: ".box-3",
      containerAnimation: scrollTween,
      toggleClass: "active",
      start: "center 60%",
      id: "3",
    });

    ScrollTrigger.create({
      trigger: ".green",
      containerAnimation: scrollTween,
      start: "center 65%",
      end: "center 51%",
      onEnter: () => console.log("enter"),
      onLeave: () => console.log("leave"),
      onEnterBack: () => console.log("enterBack"),
      onLeaveBack: () => console.log("leaveBack"),
      onToggle: (self) => console.log("active", self.isActive),
      id: "4",
    });

    return () => {
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <div className="flex flex-col">
    <Navbar/>
      <div className="description">
        <div>
          <h1>
            Horizontal "<code>containerAnimation</code>"
          </h1>
          <p>
            Scroll this page vertically and you'll see a horizontal
            fake-scrolling section where a container is animated on the x-axis
            using a ScrollTrigger animation. With{" "}
            <code>containerAnimation</code> you can trigger animations when
            certain elements <i>inside</i> that container enter the viewport
            horizontally! It's like a ScrollTrigger inside of a ScrollTrigger.
            🤯
          </p>
        </div>
        <div className="scroll-down">
          Scroll down<div className="arrow"></div>
        </div>
      </div>

      <div className="container" ref={containerRef}>
        <div className="panel blue">
          Scroll down to animate horizontally &gt;
        </div>

        <section className="panel red">
          <div>
            <pre className="code-block prettyprint lang-js linenums">
              {`gsap.to(".box-1", {
  y: -130,
  duration: 2,
  ease: "elastic",
  scrollTrigger: {
    trigger: ".box-1",
    containerAnimation: scrollTween,
    start: "left center",
    toggleActions: "play none none reset"
  }
});`}
            </pre>
            Fire an animation at a particular spot...
          </div>
          <div className="box-1 box">box-1</div>
        </section>

        <section className="panel gray">
          <div>
            <pre className="code-block prettyprint lang-js linenums">
              {`gsap.to(".box-2", {
  y: -120,
  backgroundColor: "#1e90ff",
  ease: "none",
  scrollTrigger: {
    trigger: ".box-2",
    containerAnimation: scrollTween,
    start: "center 80%",
    end: "center 20%",
    scrub: true
  }
});`}
            </pre>
            ...or scrub it back &amp; forth with the scrollbar
          </div>
          <div className="box-2 box">box-2</div>
        </section>

        <section className="panel purple">
          <div>
            <pre className="code-block prettyprint lang-js linenums">
              {`ScrollTrigger.create({
  trigger: ".box-3",
  containerAnimation: scrollTween,
  toggleClass: "active",
  start: "center 60%"
});`}
            </pre>
            Toggle a CSS class
          </div>
          <div className="box-3 box">box-3</div>
        </section>

        <section className="panel green">
          <div>
            <pre className="code-block prettyprint lang-js linenums">
              {`ScrollTrigger.create({
  trigger: ".green",
  containerAnimation: scrollTween,
  start: "center 65%",
  end: "center 51%",
  onEnter: () => console.log("enter"),
  onLeave: () => console.log("leave"),
  onEnterBack: () => console.log("enterBack"),
  onLeaveBack: () => console.log("leaveBack"),
  onToggle: self => console.log("active", self.isActive)
});`}
            </pre>
            Use the rich callback system
          </div>
        </section>
      </div>

      <div className="final">
        <div>
          <h1>Wasn't that fun?</h1>
          <p>Here are a few caveats to keep in mind:</p>
          <ul>
            <li>
              The fake-scrolling animation (just the part that's moving the
              container horizontally) must have no easing (
              <code>ease: "none"</code>).
            </li>
            <li>
              Pinning and snapping won't work on ScrollTriggers with a{" "}
              <code>containerAnimation</code>.
            </li>
            <li>
              The mapping of scroll position trigger points are based on the
              trigger element itself not being animated horizontally (inside the
              container). If you need to animate the trigger, you can either
              wrap it in a &lt;div&gt; and use that as the trigger instead or
              just factor the trigger's movement into your end position. For
              example, if you animate it left 100px, make the <code>end</code>{" "}
              100px further to the left.
            </li>
            <li>Requires ScrollTrigger 3.8.0 or later</li>
          </ul>
        </div>
      </div>
      <Events/>
      <Memories/>
    </div>
  );
}
