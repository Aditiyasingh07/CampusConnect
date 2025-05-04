import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AuthButtons from "../AuthButton/AuthButton";
import mainlogo from "/src/assets/main logo.png";
import menu from "/src/assets/menu.svg";

const CurvedMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className=" fixed top-5 z-50 menu-glass-card md:left-15 rounded-full md:mt-0 mt-5 md:ml-0 ml-10">
        <div className="flex justify-center items-center bg-white md:h-20 md:w-20 h-[180px] w-[180px] rounded-full">
          <img className="md:w-[100px] w-[170px]" src={mainlogo}></img>
        </div>
      </div>
      <div className="relative">
        {!isOpen && (
          <button
            className="fixed top-5 z-50 menu-glass-card md:right-15 right-0 text-white md:px-5 px-10 md:py-4 py-10 rounded-full shadow-lg
            md:mt-0 mt-5 md:mr-0 mr-10 md:h-20 md:w-20 h-[180px] w-[180px] flex items-center justify-center"
            onClick={() => setIsOpen(true)}
          >
            <img className="md:w-[40px] w-[130px]" src={menu}></img>
          </button>
        )}

        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: isOpen ? 0 : "100%" }}
          transition={{ type: "spring", stiffness: 40, damping: 7 }}
          className="fixed top-0 right-0 z-50 md:h-[90%] h-[40%] md:w-[17%] w-[100%] bg-[#A100FFFF] shadow-2xl md:rounded-l-[50px] rounded-l-[0px] flex flex-col items-center justify-center space-y-6"
        >
          <button
            className="absolute top-5 md:text-3xl text-[8rem] right-5 text-white rounded-full bg-[#119CFDFF] md:w-15 w-50 md:h-15 h-50 flex items-center justify-center shadow-lg"
            onClick={() => setIsOpen(false)}
          >
            💢
          </button>

          <div className="flex gap-5 md:flex-col flex-wrap justify-center text-white md:text-3xl text-[7rem] mt-10">
            <div className="md:flex flex-col gap-y-5 hidden">
              <Link to="/" className="hover:text-gray-200 cursor-pointer">
                . HOME
              </Link>
              <Link to="/events" className="hover:text-gray-200 cursor-pointer">
                . EVENTS
              </Link>
              <Link
                to="/memories"
                className="hover:text-gray-200 cursor-pointer"
              >
                . MEMORIES
              </Link>
              <Link to="/review" className="hover:text-gray-200 cursor-pointer">
                . REVIEW
              </Link>
            </div>
            <Link to="/chat" className="hover:text-gray-200 cursor-pointer">
              . CHAT
            </Link>
          </div>
          <AuthButtons />
        </motion.div>
      </div>
    </div>
  );
};

export default CurvedMenu;
