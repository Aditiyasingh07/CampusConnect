import React, { useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, db } from "../../firebaseConfig"; 
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
import Navbar from "../Navbar/Navbar";

function Signup() {
  const [name, setName] = useState("");
  const [courseName, setCourseName] = useState("");
  const [enrollmentId, setEnrollmentId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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



  return (
    <>
    <Navbar/>
    <div className="flex p-6 h-screen signup pt-[200px]">
      <div className=" flex flex-col justify-center text-white items-center w-[40%] h-[400px] m-auto ">
      <h1 className="text-2xl font-bold">Campus Connect Signup</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSignup();
        }}
        className="space-y-4 mt-4"
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
                I have an account? <Link to="/login" className="text-blue-500">Login here</Link>.
            </p>
      </form>
      </div>
    </div>
    </>
  );
}

export default Signup;
