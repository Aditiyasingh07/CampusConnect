import react, { useState } from "react";
import { Link } from "react-router-dom";
import mainlogo from "/src/assets/main logo.png";
import menu from "/src/assets/menu.svg";
import { motion } from "framer-motion";
import { auth } from "../../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import imgone from "../../../memo/it1.jpg";
import imgtwo from "../../../memo/it2.jpg";
import imgthr from "../../../memo/it3.jpg";
import imgfor from "../../../memo/it4.jpg";
import itfestbg from "/src/assets/itfest.jpg";

export default function ItFest() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = async () => {
    try {
      await auth.signOut();
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <nav>
        <div>
          <div className=" fixed md:top-5 top-[-10px] z-50 menu-glass-card md:left-15 rounded-full md:mt-0 mt-5 md:ml-0 ml-3">
            <div className="flex justify-center items-center bg-white md:h-20 md:w-20 h-[45px] w-[45px] rounded-full">
              <Link to="/">
                <img className="md:w-[100px] w-[45px]" src={mainlogo}></img>
              </Link>
            </div>
          </div>
          <div className="relative">
            {!isOpen && (
              <button
                className="fixed top-5 z-50 menu-glass-card md:right-15 right-0 text-white md:px-5 px-0 md:py-4 py-0 rounded-full shadow-lg
                md:mt-0 mt-[-10px] md:mr-0 mr-3 md:h-20 md:w-20 h-[45px] w-[45px] flex items-center justify-center"
                onClick={() => setIsOpen(true)}
              >
                <img className="md:w-[40px] w-[27px]" src={menu}></img>
              </button>
            )}

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: isOpen ? 0 : "100%" }}
              transition={{ type: "spring", stiffness: 40, damping: 7 }}
              className="fixed top-0 right-0 z-50 md:h-[90%] h-[25%] md:w-[17%] w-[100%] bg-[#A100FFFF] shadow-2xl md:rounded-l-[50px] rounded-l-[0px] flex flex-col items-center justify-center space-y-6"
            >
              <button
                className="absolute top-5 md:text-3xl text-[2rem] right-5 text-white rounded-full bg-[#119CFDFF] md:w-15 w-12 md:h-15 h-12 flex items-center justify-center shadow-lg"
                onClick={() => setIsOpen(false)}
              >
                💢
              </button>

              <div className="md:flex hidden md:gap-5 gap-2 md:flex-col flex-wrap justify-center text-white md:text-3xl text-[1.6rem] mt-10">
                <Link to="/" className="hover:text-gray-200 cursor-pointer">
                  . HOME
                </Link>
                <Link
                  to="/events"
                  className="hover:text-gray-200 cursor-pointer"
                >
                  . EVENTS
                </Link>
                <Link
                  to="/memories"
                  className="hover:text-gray-200 cursor-pointer"
                >
                  . MEMORIES
                </Link>
                <Link
                  to="/review"
                  className="hover:text-gray-200 cursor-pointer"
                >
                  . REVIEW
                </Link>
                <Link to="/chat" className="hover:text-gray-200 cursor-pointer">
                  . CHAT
                </Link>
              </div>
              <div>
                {user ? (
                  <button
                    onClick={handleLogout}
                    className=" btn-glass-card text-white md:text-2xl text-[1.3rem] hover:text-[20px] font-semibold md:mt-0 mt-0 px-4 py-2 md:h-15 h-12 md:w-40 w-25 logout-btn rounded-4xl"
                  >
                    Logout
                  </button>
                ) : (
                  <div className="flex md:flex-row flex-col gap-5 md:mt-10 mt-5 space-x-4">
                    <button className=" bg-transprent btn-glass-card text-white font-semibold rounded md:mt-0 mt-0 px-4 py-2 md:h-15 h-12 md:w-40 w-25 md:text-2xl text-[1.3rem] hover:text-[20px]">
                      <Link to="/login">Login</Link>
                    </button>
                    <button className="bg-green-500 btn-glass-card md:mt-0 mt-0 px-4 py-2 md:h-15 h-12 md:w-40 w-25 md:text-2xl text-[1.3rem] hover:text-[20px] font-semibold text-white rounded">
                      <Link to="/signup">Signup</Link>
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </nav>
      <div className=" flex flex-col justify-center items-center ">
        <img className="w-full md:h-[742px] h-[820px]" src={itfestbg}></img>
        <div className=" absolute z-30 h-full w-full bg-black opacity-80"></div>
        <div className=" absolute z-40 flex flex-wrap justify-center mt-25 items-center gap-5">
          <h1 className="absolute z-40 text-4xl font-extrabold text-white md:top-[-100px] top-[-70px]">
            IT FEST
          </h1>
          <img
            className=" md:w-[500px] w-[300px] md:rounded-tl-4xl rounded-2xl hover:scale-114 hover:rounded-2xl duration-600"
            src={imgone}
            alt=""
          />
          <img
            className=" md:w-[500px] w-[300px] md:rounded-tl-4xl rounded-2xl hover:scale-114 hover:rounded-2xl duration-600"
            src={imgtwo}
            alt=""
          />
          <img
            className=" md:w-[500px] w-[300px] md:rounded-tl-4xl rounded-2xl hover:scale-114 hover:rounded-2xl duration-600"
            src={imgthr}
            alt=""
          />
          <img
            className=" md:w-[500px] w-[300px] md:rounded-tl-4xl rounded-2xl hover:scale-114 hover:rounded-2xl duration-600"
            src={imgfor}
            alt=""
          />
        </div>
      </div>
    </>
  );
}
