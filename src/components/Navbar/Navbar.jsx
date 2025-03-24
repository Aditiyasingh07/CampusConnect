// src/components/Navbar.js
import React, { useEffect, useRef, useState } from "react";
import "/src/App.css";
import Nav from "./Nav"
import { gsap } from "gsap";

function Navbar() {

  const leftlogoref = useRef(null);

  useEffect(() => {
    gsap.to(leftlogoref.current, {
        rotationY: "180",
        duration: 5,
        repeat: -1,
        yoyo: true,
    });
  });

  return (

    <>
        <div>
          <Nav/>
        </div>
    </>
  );
}

export default Navbar;
