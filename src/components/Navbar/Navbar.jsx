// src/components/Navbar.js
import React, { useEffect, useRef, useState } from "react";
import "/src/App.css";
import { Link } from "react-router-dom";
import AuthButtons from "../AuthButton/AuthButton";
import { gsap } from "gsap";

function Navbar() {
  const navbarRef = useRef(null);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  const leftlogoref = useRef(null);

  useEffect(() => {
    gsap.to(leftlogoref.current, {
        rotationY: "180",
        duration: 5,
        repeat: -1,
        yoyo: true,
    });
  }, [setLastScrollTop]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop) {
        // Scrolling down
        gsap.to(navbarRef.current, { y: "15%", duration: 1.3 });
      } else {
        // Scrolling up
        gsap.to(navbarRef.current, { y: "-150%", duration: 1.3 });
      }
      setLastScrollTop(scrollTop <= 0 ? 0 : scrollTop); // For Mobile or negative scrolling
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  return (
    <nav
      ref={navbarRef}
      className="nav-glass-card py-4 justify-evenly flex items-center text-red-500 fixed top-0 left-0 right-0 z-50 w-[70%] m-auto mt-7"
    >
        <div className="flex space-x-3">
            <h1 className=" font-bold text-4xl">C</h1>
            <h1 
            ref={leftlogoref}
            className="text-4xl mt-1 rotate-180">C</h1>
        </div>
      {/* <img src="src/assets/mainlogo.jpg" className=" h-10 w-10" alt="Logo" /> */}
      <div className="flex items-center">
      <Link to="/" className="mr-4 text-2xl font-bold">
        Home
      </Link>
      <Link to="/events" className="mr-4 text-2xl font-bold">
        Events
      </Link>
      <Link to="/memories" className="mr-4 text-2xl font-bold">
        Memories
      </Link>
      <AuthButtons />
      </div>
    </nav>
  );
}

export default Navbar;
