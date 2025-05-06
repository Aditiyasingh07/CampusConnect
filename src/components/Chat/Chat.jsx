// src/components/Chat.js
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import mainlogo from "/src/assets/main logo.png";
import menu from "/src/assets/menu.svg";
import { motion } from "framer-motion";
import { auth, db } from "../../firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

function Chat() {
  const [groups, setGroups] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      const fetchGroups = async () => {
        const q = query(
          collection(db, "groups"),
          where("courseName", "==", user.courseName)
        );
        const querySnapshot = await getDocs(q);
        const fetchedGroups = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setGroups(fetchedGroups);
      };
      fetchGroups();
    }
  }, [user]);

  useEffect(() => {
    if (!currentGroup) return;

    const q = query(
      collection(db, "messages"),
      where("groupId", "==", currentGroup.id),
      orderBy("timestamp")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(fetchedMessages);
    });

    return () => unsubscribe();
  }, [currentGroup]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !currentGroup) return;

    try {
      const messageData = {
        groupId: currentGroup.id,
        sender: user.name,
        content: newMessage,
        timestamp: serverTimestamp(), // Firestore timestamp
      };
      await addDoc(collection(db, "messages"), messageData);
      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <nav>
        <div>
          <div className="fixed md:top-5 top-[-10px] z-50 menu-glass-card md:left-15 rounded-full md:mt-0 mt-5 md:ml-0 ml-3">
            <div className="flex justify-center items-center bg-white md:h-20 md:w-20 h-[45px] w-[45px] rounded-full">
              <Link to="/">
                <img className="md:w-[100px] w-[45px]" src={mainlogo} />
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
                <img className="md:w-[40px] w-[27px]" src={menu} />
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
                <Link to="/" className="hover:text-gray-200 cursor-pointer">. HOME</Link>
                <Link to="/events" className="hover:text-gray-200 cursor-pointer">. EVENTS</Link>
                <Link to="/memories" className="hover:text-gray-200 cursor-pointer">. MEMORIES</Link>
                <Link to="/review" className="hover:text-gray-200 cursor-pointer">. REVIEW</Link>
                <Link to="/chat" className="hover:text-gray-200 cursor-pointer">. CHAT</Link>
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

      <div className="p-6 flex md:flex-row flex-col md:h-full h-screen pt-[100px] bg-[#622486] text-white">
        {user ? (
          <>
            <div className="md:w-1/4 w-full md:border-r border-0 pr-4">
              <h2 className="text-3xl text-center font-bold">Groups</h2>
              <ul className="mt-4 space-y-2 text-gray-800">
                {groups.map((group) => (
                  <li
                    key={group.id}
                    className={`p-2 rounded-xl text-2xl font-bold text-center cursor-pointer ${
                      currentGroup?.id === group.id ? "bg-gray-200" : "bg-gray-100"
                    }`}
                    onClick={() => setCurrentGroup(group)}
                  >
                    {group.courseName}
                  </li>
                ))}
              </ul>
              <button
                onClick={handleLogout}
                className="w-full chat-btn text-2xl font-black rounded-3xl text-white p-4 mt-10"
              >
                Logout
              </button>
            </div>

            <div className="md:w-3/4 w-full md:pl-4 pl-0 md:mt-0 mt-10">
              {currentGroup ? (
                <div className="text-white md:p-10 p-0">
                  <h2 className="text-2xl bg-[#119CFDFF] w-40 text-center rounded-3xl p-3 font-bold mb-4">
                    Chat - {currentGroup.courseName}
                  </h2>
                  <div className="h-64 md:w-full border overflow-auto rounded-2xl p-5 mb-4 text-white">
                    {messages.map((msg, index) => (
                      <div key={index} className="mb-5 flex flex-row items-center gap-5">
                        <strong>{msg.sender}:</strong>
                        <span>{msg.content}</span>
                        <span className="text-sm text-gray-300">
                          (
                          {msg.timestamp?.toDate
                            ? msg.timestamp.toDate().toLocaleString()
                            : "Sending..."}
                          )
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1 p-2 border rounded-xl text-white"
                    />
                    <button
                      onClick={sendMessage}
                      className="ml-2 chat-send bg-gradient-to-r from-red-400 text-white text-2xl font-bold mt-5 rounded-2xl py-2"
                    >
                      Send
                    </button>
                  </div>
                </div>
              ) : (
                <h2 className="text-2xl text-white font-bold text-center mt-10">
                  Select a group to chat
                </h2>
              )}
            </div>
          </>
        ) : (
          <div className="w-full flex pt-5 md:p-0 p-3 justify-center items-center text-center h-[150px] rounded-4xl md:text-5xl text-3xl font-bold">
            Login to chat with your friends.
          </div>
        )}
      </div>
    </>
  );
}

export default Chat;






























// // src/components/Chat.js
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import mainlogo from "/src/assets/main logo.png";
// import menu from "/src/assets/menu.svg";
// import { motion } from "framer-motion";
// import { auth, db } from "../../firebaseConfig";
// import { collection, query, where, getDocs, addDoc } from "firebase/firestore";

// function Chat() {
//   const [groups, setGroups] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const [currentGroup, setCurrentGroup] = useState(null);
//   const [newMessage, setNewMessage] = useState("");
//   const navigate = useNavigate();

//   const user = JSON.parse(localStorage.getItem("user"));

//   useEffect(() => {
//     if (user) {
//       const fetchGroups = async () => {
//         const q = query(
//           collection(db, "groups"),
//           where("courseName", "==", user.courseName)
//         );
//         const querySnapshot = await getDocs(q);
//         const fetchedGroups = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setGroups(fetchedGroups);
//       };
//       fetchGroups();
//     }
//   }, [user]);

//   const fetchMessages = async (groupId) => {
//     const q = query(
//       collection(db, "messages"),
//       where("groupId", "==", groupId)
//     );
//     const querySnapshot = await getDocs(q);
//     const fetchedMessages = querySnapshot.docs.map((doc) => doc.data());
//     setMessages(fetchedMessages);
//   };

//   const sendMessage = async () => {
//     if (!newMessage.trim() || !currentGroup) return;

//     try {
//       const messageData = {
//         groupId: currentGroup.id,
//         sender: user.name,
//         content: newMessage,
//         timestamp: new Date(),
//       };
//       await addDoc(collection(db, "messages"), messageData);
//       setMessages([...messages, messageData]);
//       setNewMessage("");
//     } catch (error) {
//       console.error("Failed to send message:", error);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await auth.signOut();
//       localStorage.removeItem("user");
//       navigate("/login");
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <>
//       <nav>
//         <div>
//           <div className=" fixed md:top-5 top-[-10px] z-50 menu-glass-card md:left-15 rounded-full md:mt-0 mt-5 md:ml-0 ml-3">
//             <div className="flex justify-center items-center bg-white md:h-20 md:w-20 h-[45px] w-[45px] rounded-full">
//               <Link to="/">
//                 <img className="md:w-[100px] w-[45px]" src={mainlogo}></img>
//               </Link>
//             </div>
//           </div>
//           <div className="relative">
//             {!isOpen && (
//               <button
//                 className="fixed top-5 z-50 menu-glass-card md:right-15 right-0 text-white md:px-5 px-0 md:py-4 py-0 rounded-full shadow-lg
//             md:mt-0 mt-[-10px] md:mr-0 mr-3 md:h-20 md:w-20 h-[45px] w-[45px] flex items-center justify-center"
//                 onClick={() => setIsOpen(true)}
//               >
//                 <img className="md:w-[40px] w-[27px]" src={menu}></img>
//               </button>
//             )}

//             <motion.div
//               initial={{ x: "100%" }}
//               animate={{ x: isOpen ? 0 : "100%" }}
//               transition={{ type: "spring", stiffness: 40, damping: 7 }}
//               className="fixed top-0 right-0 z-50 md:h-[90%] h-[25%] md:w-[17%] w-[100%] bg-[#A100FFFF] shadow-2xl md:rounded-l-[50px] rounded-l-[0px] flex flex-col items-center justify-center space-y-6"
//             >
//               <button
//                 className="absolute top-5 md:text-3xl text-[2rem] right-5 text-white rounded-full bg-[#119CFDFF] md:w-15 w-12 md:h-15 h-12 flex items-center justify-center shadow-lg"
//                 onClick={() => setIsOpen(false)}
//               >
//                 💢
//               </button>

//               <div className="md:flex hidden md:gap-5 gap-2 md:flex-col flex-wrap justify-center text-white md:text-3xl text-[1.6rem] mt-10">
//                 <Link to="/" className="hover:text-gray-200 cursor-pointer">
//                   . HOME
//                 </Link>
//                 <Link
//                   to="/events"
//                   className="hover:text-gray-200 cursor-pointer"
//                 >
//                   . EVENTS
//                 </Link>
//                 <Link
//                   to="/memories"
//                   className="hover:text-gray-200 cursor-pointer"
//                 >
//                   . MEMORIES
//                 </Link>
//                 <Link
//                   to="/review"
//                   className="hover:text-gray-200 cursor-pointer"
//                 >
//                   . REVIEW
//                 </Link>
//                 <Link to="/chat" className="hover:text-gray-200 cursor-pointer">
//                   . CHAT
//                 </Link>
//               </div>
//               <div>
//                 {user ? (
//                   <button
//                     onClick={handleLogout}
//                     className=" btn-glass-card text-white md:text-2xl text-[1.3rem] hover:text-[20px] font-semibold md:mt-0 mt-0 px-4 py-2 md:h-15 h-12 md:w-40 w-25 logout-btn rounded-4xl"
//                   >
//                     Logout
//                   </button>
//                 ) : (
//                   <div className="flex md:flex-row flex-col gap-5 md:mt-10 mt-5 space-x-4">
//                     <button className=" bg-transprent btn-glass-card text-white font-semibold rounded md:mt-0 mt-0 px-4 py-2 md:h-15 h-12 md:w-40 w-25 md:text-2xl text-[1.3rem] hover:text-[20px]">
//                       <Link to="/login">Login</Link>
//                     </button>
//                     <button className="bg-green-500 btn-glass-card md:mt-0 mt-0 px-4 py-2 md:h-15 h-12 md:w-40 w-25 md:text-2xl text-[1.3rem] hover:text-[20px] font-semibold text-white rounded">
//                       <Link to="/signup">Signup</Link>
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </nav>
//       <div className="p-6 flex md:flex-row flex-col md:h-full h-screen pt-[100px] bg-[#622486] text-white">
//         {user ? (
//           <>
//             <div className="md:w-1/4 w-full md:border-r border-0 pr-4">
//               <h2 className="text-3xl text-center font-bold">Groups</h2>
//               <ul className="mt-4 space-y-2 text-gray-800">
//                 {groups.map((group) => (
//                   <li
//                     key={group.id}
//                     className={`p-2 rounded-xl text-2xl font-bold text-center cursor-pointer ${
//                       currentGroup?.id === group.id
//                         ? "bg-gray-200"
//                         : "bg-gray-100"
//                     }`}
//                     onClick={() => {
//                       setCurrentGroup(group);
//                       fetchMessages(group.id);
//                     }}
//                   >
//                     {group.courseName}
//                   </li>
//                 ))}
//               </ul>
//               <button
//                 onClick={handleLogout}
//                 className="w-full chat-btn text-2xl font-black rounded-3xl text-white p-4 mt-10"
//               >
//                 Logout
//               </button>
//             </div>
//             <div className="md:w-3/4 w-full md:pl-4 pl-0 md:mt-0 mt-10">
//               {currentGroup ? (
//                 <div className="text-white md:p-10 p-0">
//                   <h2 className="text-2xl bg-[#119CFDFF] w-40 text-center rounded-3xl p-3 font-bold mb-4">
//                     Chat - {currentGroup.courseName}
//                   </h2>
//                   <div className="h-64 md:w-full border overflow-auto rounded-2xl p-5 mb-4">
//                     {messages.map((msg, index) => (
//                       <div key={index} className="mb-5 flex gap-3">
//                         <strong>{msg.sender}:</strong> {msg.content}
//                       </div>
//                     ))}
//                   </div>
//                   <div className="flex flex-col">
//                     <input
//                       type="text"
//                       placeholder="Type your message..."
//                       value={newMessage}
//                       onChange={(e) => setNewMessage(e.target.value)}
//                       className="flex-1 p-2 border rounded-xl"
//                     />
//                     <button
//                       onClick={sendMessage}
//                       className="ml-2 chat-send bg-gradient-to-r from-red-400 text-white text-2xl font-bold mt-5 rounded-2xl py-2"
//                     >
//                       Send
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <h2 className="text-2xl text-white font-bold text-center mt-10">
//                   Select a group to chat
//                 </h2>
//               )}
//             </div>
//           </>
//         ) : (
//           <div className="w-full flex pt-5 md:p-0 p-3 justify-center items-center text-center h-[150px] rounded-4xl md:text-5xl text-3xl font-bold">
//             Login to chat with your friends.
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export default Chat;
