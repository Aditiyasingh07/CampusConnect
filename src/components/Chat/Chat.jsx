// src/components/Chat.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebaseConfig";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import Navbar from "../Navbar/Navbar";

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

  const fetchMessages = async (groupId) => {
    const q = query(
      collection(db, "messages"),
      where("groupId", "==", groupId)
    );
    const querySnapshot = await getDocs(q);
    const fetchedMessages = querySnapshot.docs.map((doc) => doc.data());
    setMessages(fetchedMessages);
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !currentGroup) return;

    try {
      const messageData = {
        groupId: currentGroup.id,
        sender: user.name,
        content: newMessage,
        timestamp: new Date(),
      };
      await addDoc(collection(db, "messages"), messageData);
      setMessages([...messages, messageData]);
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

  return (
    <>
      <Navbar />
      <div className="p-6 flex h-screen pt-[100px] bg-[#622486] text-white">
        {user ? (
          <>
            <div className="w-1/4 border-r pr-4">
              <h2 className="text-3xl text-center font-bold">Groups</h2>
              <ul className="mt-4 space-y-2">
                {groups.map((group) => (
                  <li
                    key={group.id}
                    className={`p-2 rounded-xl text-2xl font-bold text-center cursor-pointer ${
                      currentGroup?.id === group.id
                        ? "bg-gray-300"
                        : "bg-gray-100"
                    }`}
                    onClick={() => {
                      setCurrentGroup(group);
                      fetchMessages(group.id);
                    }}
                  >
                    {group.courseName}
                  </li>
                ))}
              </ul>
              <button
                onClick={handleLogout}
                className="w-full text-2xl font-black rounded-3xl bg-gradient-to-r from-blue-400 via-red-400 to-pink-400 text-white p-4 mt-10"
              >
                Logout
              </button>
            </div>
            <div className="w-3/4 pl-4">
              {currentGroup ? (
                <div className="text-white p-10">
                  <h2 className="text-2xl bg-[#119CFDFF] w-40 text-center rounded-3xl p-3 font-bold mb-4">
                    Chat - {currentGroup.courseName}
                  </h2>
                  <div className="h-64 border overflow-auto rounded-2xl p-5 mb-4">
                    {messages.map((msg, index) => (
                      <div key={index} className="mb-5 flex gap-3">
                        <strong>{msg.sender}:</strong> {msg.content}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1 p-2 border rounded-xl"
                    />
                    <button
                      onClick={sendMessage}
                      className="ml-2 bg-gradient-to-r from-red-400 to-pink-800 text-white text-2xl font-bold mt-5 rounded-2xl py-2"
                    >
                      Send
                    </button>
                  </div>
                </div>
              ) : (
                <h2 className="text-xl text-black font-bold text-center mt-10">
                  Select a group to chat
                </h2>
              )}
            </div>
          </>
        ) : (
          <div className="w-full bg-[#119CFDFF] flex pt-5 justify-center h-full rounded-4xl text-5xl font-bold">
            Login to chat with your friends.
          </div>
        )}
      </div>
    </>
  );
}

export default Chat;
