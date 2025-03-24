import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AuthButtons from "../AuthButton/AuthButton";

const CurvedMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className=" fixed top-5 z-50 menu-glass-card left-15 rounded-full ">
        <div className="flex justify-center items-center text-3xl text-black bg-white h-15 w-17 rounded-full">
        <h1 className=" font-bold mr-1">
          C
        </h1>
        <h1>
          C
        </h1>
        </div>
      </div>
      <div className="relative">
      {!isOpen && (
        <button
          className="fixed top-5 z-50 menu-glass-card right-15 text-white px-5 py-4 rounded-full shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          <img src="/src/assets/menu.svg" width="30px">
          </img>
        </button>
      )}

      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 40, damping: 7 }}
        className="fixed top-0 right-0 z-50 h-[90%] w-[17%] bg-[#A100FFFF] shadow-2xl rounded-l-[50px] flex flex-col items-center justify-center space-y-6"
      >
        <button
          className="absolute top-5 text-3xl right-5 text-white rounded-full bg-[#119CFDFF] w-15 h-15 flex items-center justify-center shadow-lg"
          onClick={() => setIsOpen(false)}
        >
          💢
        </button>

        <div className="flex gap-5 flex-col text-white text-3xl mt-10">
          <Link to="/" className="hover:text-gray-200 cursor-pointer">. HOME</Link>
          <Link to="/events" className="hover:text-gray-200 cursor-pointer">. EVENTS</Link>
          <Link to="/memories" className="hover:text-gray-200 cursor-pointer">. MEMORIES</Link>
          <Link to="/review" className="hover:text-gray-200 cursor-pointer">. REVIEW</Link>
          <Link to="/chat" className="hover:text-gray-200 cursor-pointer">. CHAT</Link>
        </div>
            <AuthButtons/>
      </motion.div>
    </div>
    </div>
  );
};

export default CurvedMenu;
