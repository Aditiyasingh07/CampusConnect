import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, db } from "../../firebaseConfig";
import { motion } from "framer-motion";
import mainlogo from "/src/assets/main logo.png";
import menu from "/src/assets/menu.svg";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

function Signup() {
  const [name, setName] = useState("");
  const [courseName, setCourseName] = useState("");
  const [enrollmentId, setEnrollmentId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignup = async () => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name,
        courseName,
        enrollmentId,
      });

      const groupsQuery = query(
        collection(db, "groups"),
        where("courseName", "==", courseName)
      );
      const groupsSnapshot = await getDocs(groupsQuery);

      if (groupsSnapshot.empty) {
        await addDoc(collection(db, "groups"), {
          courseName,
          members: [user.uid],
        });
      } else {
        const groupDoc = groupsSnapshot.docs[0];
        const groupRef = doc(db, "groups", groupDoc.id);
        await updateDoc(groupRef, {
          members: arrayUnion(user.uid),
        });
      }

      alert("Signup successful! Please log in.");
      navigate("/login");
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

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
      <div>
        <div className=" fixed md:top-5 top-2 z-50 menu-glass-card md:left-15 left-[10px] rounded-full">
          <div className="flex justify-center items-center bg-white md:h-20 md:w-20 h-[50px] w-[50px] rounded-full">
            <img className="md:w-[100px] w-[50px]" src={mainlogo}></img>
          </div>
        </div>
        <div className="relative">
          {!isOpen && (
            <button
              className="fixed md:top-5 top-2 z-50 menu-glass-card md:right-15 right-[10px] text-white md:px-5 px-0 md:py-4 py-0 rounded-full shadow-lg
           md:h-20 md:w-20 h-[50px] w-[50px] flex items-center justify-center"
              onClick={() => setIsOpen(true)}
            >
              <img className="md:w-[40px] w-[30px]" src={menu}></img>
            </button>
          )}

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: isOpen ? 0 : "100%" }}
            transition={{ type: "spring", stiffness: 40, damping: 7 }}
            className="fixed top-0 right-0 z-50 md:h-[90%] h-[40%] md:w-[17%] w-[100%] bg-[#A100FFFF] shadow-2xl md:rounded-l-[50px] rounded-l-[0px] flex flex-col items-center justify-center space-y-6"
          >
            <button
              className="absolute md:top-5 top-2 md:text-3xl text-[2rem] right-5 text-white rounded-full bg-[#119CFDFF] md:w-15 w-15 md:h-15 h-15 flex items-center justify-center shadow-lg"
              onClick={() => setIsOpen(false)}
            >
              💢
            </button>

            <div className="md:flex hidden gap-5 md:flex-col text-center justify-center items-center text-white md:text-3xl text-[1.7rem] md:mt-0 mt-15 md:mb-0 mb-[-50px]">
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
              <Link to="/chat" className="hover:text-gray-200 cursor-pointer">
                . CHAT
              </Link>
            </div>
            <div>
              {user ? (
                <button
                  onClick={handleLogout}
                  className=" btn-glass-card text-white md:text-2xl text-[5rem] hover:text-[20px] font-semibold md:mt-0 mt-10 px-4 py-2 md:h-15 h-40 md:w-40 w-80 logout-btn rounded-4xl"
                >
                  Logout
                </button>
              ) : (
                <div className=" flex md:flex-col gap-5 mt-10 space-x-4">
                  <button className=" bg-transprent btn-glass-card text-white font-semibold rounded md:mt-0 mt-10 px-4 py-2 md:h-15 h-15 md:w-40 w-25 md:text-2xl text-[1.52rem] hover:text-[20px]">
                    <Link to="/login">Login</Link>
                  </button>
                  <button className="bg-green-500 btn-glass-card md:mt-0 mt-10 px-4 py-2 md:h-15 h-15 md:w-40 w-25 md:text-2xl text-[1.52rem] hover:text-[20px] font-semibold text-white rounded">
                    <Link to="/signup">Signup</Link>
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
      <div className="flex p-6 h-screen signup md:pt-[200px] pt-[150px]">
        <div className=" flex flex-col justify-center text-white items-center md:w-[40%] w-full h-[400px] m-auto ">
          <h1 className="md:text-2xl text-[1.7rem] font-bold mb:mb-0 mb-5">
            Campus Connect Signup
          </h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSignup();
            }}
            className="space-y-4 md:mt-4 mt-0"
          >
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border outline-none rounded-xl"
            />
            <input
              type="text"
              placeholder="Course Name"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              className="w-full p-3 border outline-none rounded-xl"
            />
            <input
              type="text"
              placeholder="Enrollment ID"
              value={enrollmentId}
              onChange={(e) => setEnrollmentId(e.target.value)}
              className="w-full p-3 border outline-none rounded-xl"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border outline-none rounded-xl"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border outline-none rounded-xl"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full text-2xl font-black rounded-3xl bg-gradient-to-r npm from-red-400 to-pink-800 text-white p-4"
            >
              {loading ? "Signing up..." : "Signup"}
            </button>
            <p>
              I have an account?{" "}
              <Link to="/login" className="text-blue-500">
                Login here
              </Link>
              .
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
