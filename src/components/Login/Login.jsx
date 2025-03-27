// src/components/Login.js
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, db } from "../../firebaseConfig"; // Import auth and db from firebaseConfig
import { gsap } from "gsap";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import Navbar from "../Navbar/Navbar";
import springlogo from "/src/assets/spring.png"

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        alert("User  not found. Please sign up.");
        return;
      }

      const userData = querySnapshot.docs[0].data();
      localStorage.setItem("user", JSON.stringify(userData));
      navigate("/chat");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const loginanim = useRef(null)

  useEffect(() => {
    gsap.to(loginanim.current, {
      scale: "1.2",
      duration: 5,
      repeat: -1,
      yoyo: true,
    });
  });

  return (
    <>
      <Navbar />
      <div className="flex p-6 h-screen login pt-[200px]">
        <div className=" flex flex-col text-white justify-center items-center w-[40%] h-[400px] m-auto ">
          <h1 className="text-2xl font-bold">Campus Connect Login</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            className="space-y-4 mt-4"
          >
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
              className="w-full p-3 outline-none border rounded-xl"
            />
            <button
              type="submit"
              disabled={loading}
              className=" w-full text-2xl font-black rounded-3xl bg-gradient-to-r from-red-400 to-pink-800 text-white p-4"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500">
              Sign up here
            </Link>
            .
          </p>
        </div>
        <div>
            <img 
            ref={loginanim}
            src={springlogo}
            className="w-[60%] mr-15 rotate-12"
            >
            </img>
        </div>
      </div>
    </>
  );
}

export default Login;
