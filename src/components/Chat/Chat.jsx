// src/components/Chat.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebaseConfig'; // Import auth and db from firebaseConfig
import { collection, query, where, getDocs, addDoc} from 'firebase/firestore';
import Navbar from '../Navbar/Navbar';

function Chat() {
    const [groups, setGroups] = useState([]);
    const [messages, setMessages] = useState([]);
    const [currentGroup, setCurrentGroup] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGroups = async () => {
            const q = query(collection(db, 'groups'), where('courseName', '==', user.courseName));
            const querySnapshot = await getDocs(q);
            const fetchedGroups = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setGroups(fetchedGroups);
        };

        fetchGroups();
    }, [user.courseName]);

    const fetchMessages = async (groupId) => {
        const q = query(collection(db, 'messages'), where('groupId', '==', groupId));
        const querySnapshot = await getDocs(q);
        const fetchedMessages = querySnapshot.docs.map(doc => doc.data());
        setMessages(fetchedMessages);
    };

    const sendMessage = async () => {
        if (!newMessage.trim()) return;

        try {
            const messageData = {
                groupId: currentGroup.id,
                sender: user.name,
                content: newMessage,
                timestamp: new Date(),
            };
            await addDoc(collection(db, 'messages'), messageData);
            setMessages([...messages, messageData]);
            setNewMessage('');
        } catch (error) {
            console.error('Failed to send message:', error);
        }
    };

    const handleLogout = async () => {
        try {
            await auth.signOut();
            localStorage.removeItem('user');
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <>
        <Navbar/>
        <div className="p-6 flex">
            <div className="w-1/4 border-r pr-4">
                <h2 className="text-xl font-bold">Groups</h2>
                <ul className="mt-4 space-y-2">
                    {groups.map((group) => (
                        <li
                            key={group.id}
                            className={`p-2 rounded cursor-pointer ${currentGroup?.id === group.id ? 'bg-gray-300' : 'bg-gray-100'}`}
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
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded w-full"
                >
                    Logout
                </button>
            </div>
            <div className="w-3/4 pl-4">
                {currentGroup ? (
                    <div>
                        <h2 className="text-xl font-bold mb-4">Chat - {currentGroup.courseName}</h2>
                        <div className="h-64 overflow-y-scroll border p-4 mb-4">
                            {messages.map((msg, index) => (
                                <div key={index} className="mb-2">
                                    <strong>{msg.sender}:</strong> {msg.content}
                                </div>
                            ))}
                        </div>
                        <div className="flex">
                            <input
                                type="text"
                                placeholder="Type your message..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                className="flex-1 p-2 border rounded"
                            />
                            <button
                                onClick={sendMessage}
                                className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Send
                            </button>
                        </div>
                    </div>
                ) : (
                    <h2 className="text-xl font-bold">Select a group to chat</h2>
                )}
            </div>
        </div>
        </>
    );
}

export default Chat;