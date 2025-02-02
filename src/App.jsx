import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Chat from './components/Chat/Chat';
import Navbar from './components/Navbar/Navbar';
import Events from './components/Events/Events';
import Memories from './components/Memories/Memories';
import Home from './components/Home/Home';


function App() {
    return (
        <Router>
            <div className="container mx-auto bg-blue-200 text-red-500">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/memories" element={<Memories />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;






















// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
// import "tailwindcss";
// // import 'tailwindcss/base';
// import { initializeApp } from 'firebase/app';
// import {
//     getAuth,
//     createUserWithEmailAndPassword,
//     signInWithEmailAndPassword,
//     signOut,
// } from 'firebase/auth';
// import {
//     getFirestore,
//     collection,
//     addDoc,
//     query,
//     where,
//     getDocs,
//     doc,
//     updateDoc,
//     arrayUnion,
// } from 'firebase/firestore';

// const firebaseConfig = {
//     apiKey: "AIzaSyBQAmDfBs4Dz2w1A3hBaEILD_bQOEGbL94",
//     authDomain: "campusconnect-b4df3.firebaseapp.com",
//     projectId: "campusconnect-b4df3",
//     storageBucket: "campusconnect-b4df3.firebasestorage.app",
//     messagingSenderId: "4057338049",
//     appId: "1:4057338049:web:0bdb494394de4da4010440",
//     measurementId: "G-EMMV5WMX8M"
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);

// function Signup() {
//     const [name, setName] = useState('');
//     const [courseName, setCourseName] = useState('');
//     const [enrollmentId, setEnrollmentId] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     const handleSignup = async () => {
//         setLoading(true);
//         try {
//             const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//             const user = userCredential.user;

//             await addDoc(collection(db, 'users'), {
//                 uid: user.uid,
//                 name,
//                 courseName,
//                 enrollmentId,
//             });

//             // Check if a group for this course already exists
//             const groupsQuery = query(collection(db, 'groups'), where('courseName', '==', courseName));
//             const groupsSnapshot = await getDocs(groupsQuery);

//             if (groupsSnapshot.empty) {
//                 // Create new group if not exist
//                 await addDoc(collection(db, 'groups'), {
//                     courseName,
//                     members: [user.uid],
//                 });
//             } else {
//                 // Get the group document
//                 const groupDoc = groupsSnapshot.docs[0];
//                 const groupRef = doc(db, 'groups', groupDoc.id);

//                 // Update the existing group with the new user id.
//                 await updateDoc(groupRef, {
//                   members: arrayUnion(user.uid),
//                 });
//             }

//             alert('Signup successful! Please log in.');
//             navigate('/login');
//         } catch (error) {
//             console.error('Signup failed:', error);
//             alert('Signup failed. Please try again.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="p-6">
//             <h1 className="text-2xl font-bold">Campus Connect Signup</h1>
//             <form
//                 onSubmit={(e) => {
//                     e.preventDefault();
//                     handleSignup();
//                 }}
//                 className="space-y-4 mt-4"
//             >
//                 <input
//                     type="text"
//                     placeholder="Name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     className="w-full p-2 border rounded"
//                 />
//                 <input
//                     type="text"
//                     placeholder="Course Name"
//                     value={courseName}
//                     onChange={(e) => setCourseName(e.target.value)}
//                     className="w-full p-2 border rounded"
//                 />
//                 <input
//                     type="text"
//                     placeholder="Enrollment ID"
//                     value={enrollmentId}
//                     onChange={(e) => setEnrollmentId(e.target.value)}
//                     className="w-full p-2 border rounded"
//                 />
//                 <input
//                     type="email"
//                     placeholder="Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="w-full p-2 border rounded"
//                 />
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="w-full p-2 border rounded"
//                 />
//                 <button
//                     type="submit"
//                     disabled={loading}
//                     className="bg-blue-500 text-white px-4 py-2 rounded"
//                 >
//                     {loading ? 'Signing up...' : 'Signup'}
//                 </button>
//             </form>
//         </div>
//     );
// }

// function Login() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     const handleLogin = async () => {
//         setLoading(true);
//         try {
//             const userCredential = await signInWithEmailAndPassword(auth, email, password);
//             const user = userCredential.user;

//             // Fetch user data
//             const q = query(collection(db, 'users'), where('uid', '==', user.uid));
//             const querySnapshot = await getDocs(q);
//             if (querySnapshot.empty) {
//                 alert('User not found. Please sign up.');
//                 return;
//             }

//             const userData = querySnapshot.docs[0].data();

//             // Fetch the group for this user's course
//             const groupQuery = query(collection(db, 'groups'), where('courseName', '==', userData.courseName));
//             const groupSnapshot = await getDocs(groupQuery);

//             if(!groupSnapshot.empty){
//               // Get the group document
//               const groupDoc = groupSnapshot.docs[0];
//               const groupRef = doc(db, 'groups', groupDoc.id);

//               if(!groupDoc.data().members.includes(user.uid)) {
//                 // Update the existing group with the new user id.
//                 await updateDoc(groupRef, {
//                   members: arrayUnion(user.uid),
//                 });
//               }
//             }


//             localStorage.setItem('user', JSON.stringify(userData));
//             navigate('/chat');
//         } catch (error) {
//             console.error('Login failed:', error);
//             alert('Login failed. Please try again.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="p-6">
//             <h1 className="text-2xl font-bold">Campus Connect Login</h1>
//             <form
//                 onSubmit={(e) => {
//                     e.preventDefault();
//                     handleLogin();
//                 }}
//                 className="space-y-4 mt-4"
//             >
//                 <input
//                     type="email"
//                     placeholder="Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="w-full p-2 border rounded"
//                 />
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="w-full p-2 border rounded"
//                 />
//                 <button
//                     type="submit"
//                     disabled={loading}
//                     className="bg-blue-500 text-white px-4 py-2 rounded"
//                 >
//                     {loading ? 'Logging in...' : 'Login'}
//                 </button>
//             </form>
//             <p className="mt-4">
//                 Don't have an account? <Link to="/signup" className="text-blue-500">Sign up here</Link>.
//             </p>
//         </div>
//     );
// }

// function Chat() {
//     const [groups, setGroups] = useState([]);
//     const [messages, setMessages] = useState([]);
//     const [currentGroup, setCurrentGroup] = useState(null);
//     const [newMessage, setNewMessage] = useState('');
//     const user = JSON.parse(localStorage.getItem('user'));
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchGroups = async () => {
//             const q = query(collection(db, 'groups'), where('courseName', '==', user.courseName));
//             const querySnapshot = await getDocs(q);
//             const fetchedGroups = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//             setGroups(fetchedGroups);
//         };

//         fetchGroups();
//     }, [user.courseName]);

//     const fetchMessages = async (groupId) => {
//         const q = query(collection(db, 'messages'), where('groupId', '==', groupId));
//         const querySnapshot = await getDocs(q);
//         const fetchedMessages = querySnapshot.docs.map(doc => doc.data());
//         setMessages(fetchedMessages);
//     };

//     const sendMessage = async () => {
//         if (!newMessage.trim()) return;

//         try {
//             const messageData = {
//                 groupId: currentGroup.id,
//                 sender: user.name,
//                 content: newMessage,
//                 timestamp: new Date(),
//             };
//             await addDoc(collection(db, 'messages'), messageData);
//             setMessages([...messages, messageData]);
//             setNewMessage('');
//         } catch (error) {
//             console.error('Failed to send message:', error);
//         }
//     };

//     const handleLogout = async () => {
//         try {
//             await signOut(auth);
//             localStorage.removeItem('user');
//             navigate('/login');
//         } catch (error) {
//             console.error('Logout failed:', error);
//         }
//     };

//     return (
//         <div className="p-6 flex">
//             <div className="w-1/4 border-r pr-4">
//                 <h2 className="text-xl font-bold">Groups</h2>
//                 <ul className="mt-4 space-y-2">
//                     {groups.map((group) => (
//                         <li
//                             key={group.id}
//                             className={`p-2 rounded cursor-pointer ${currentGroup?.id === group.id ? 'bg-gray-300' : 'bg-gray-100'}`}
//                             onClick={() => {
//                                 setCurrentGroup(group);
//                                 fetchMessages(group.id);
//                             }}
//                         >
//                             {group.courseName}
//                         </li>
//                     ))}
//                 </ul>
//                 <button
//                     onClick={handleLogout}
//                     className="mt-4 bg-red-500 text-white px-4 py-2 rounded w-full"
//                 >
//                     Logout
//                 </button>
//             </div>
//             <div className="w-3/4 pl-4">
//                 {currentGroup ? (
//                     <div>
//                         <h2 className="text-xl font-bold mb-4">Chat - {currentGroup.courseName}</h2>
//                         <div className="h-64 overflow-y-scroll border p-4 mb-4">
//                             {messages.map((msg, index) => (
//                                 <div key={index} className="mb-2">
//                                     <strong>{msg.sender}:</strong> {msg.content}
//                                 </div>
//                             ))}
//                         </div>
//                         <div className="flex">
//                             <input
//                                 type="text"
//                                 placeholder="Type your message..."
//                                 value={newMessage}
//                                 onChange={(e) => setNewMessage(e.target.value)}
//                                 className="flex-1 p-2 border rounded"
//                             />
//                             <button
//                                 onClick={sendMessage}
//                                 className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
//                             >
//                                 Send
//                             </button>
//                         </div>
//                     </div>
//                 ) : (
//                     <h2 className="text-xl font-bold">Select a group to chat</h2>
//                 )}
//             </div>
//         </div>
//     );
// }

// // Main App Component
// function App() {
//     return (
//         <Router>
//             <div className="container mx-auto bg-blue-200 text-red-500">
//                 <nav className="flex p-4 bg-gray-800 items-center text-red-500">  
//                     <img className=" bg-amber-950 h-10 w-10"></img>
//                     <Link to="/" className="mr-4 text-2xl font-bold">Home</Link>
//                     <Link to="/signup" className="mr-4 text-2xl">Signup</Link>
//                     <Link to="/login" className="text-2xl">Login</Link>
//                 </nav>
//                 <Routes>
//                     <Route path="/" element={<h1 className="text-2xl font-bold bg-red-500">Welcome to Campus Connect</h1>} />
//                     <Route path="/signup" element={<Signup />} />
//                     <Route path="/login" element={<Login />} />
//                     <Route path="/chat" element={<Chat />} />
//                 </Routes>
//             </div>
//         </Router>
//     );
// }
// export default App;

















// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
// import { initializeApp } from 'firebase/app';
// import {
//     getAuth,
//     createUserWithEmailAndPassword,
//     signInWithEmailAndPassword,
//     signOut,
// } from 'firebase/auth';
// import {
//     getFirestore,
//     collection,
//     addDoc,
//     query,
//     where,
//     getDocs,
//     doc,
//     updateDoc,
//     arrayUnion,
// } from 'firebase/firestore';

// const firebaseConfig = {
//     apiKey: "AIzaSyBQAmDfBs4Dz2w1A3hBaEILD_bQOEGbL94",
//     authDomain: "campusconnect-b4df3.firebaseapp.com",
//     projectId: "campusconnect-b4df3",
//     storageBucket: "campusconnect-b4df3.firebasestorage.app",
//     messagingSenderId: "4057338049",
//     appId: "1:4057338049:web:0bdb494394de4da4010440",
//     measurementId: "G-EMMV5WMX8M"
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);

// function Signup() {
//     const [name, setName] = useState('');
//     const [courseName, setCourseName] = useState('');
//     const [enrollmentId, setEnrollmentId] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     const handleSignup = async () => {
//         setLoading(true);
//         try {
//             const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//             const user = userCredential.user;

//             await addDoc(collection(db, 'users'), {
//                 uid: user.uid,
//                 name,
//                 courseName,
//                 enrollmentId,
//             });

//             // Check if a group for this course already exists
//             const groupsQuery = query(collection(db, 'groups'), where('courseName', '==', courseName));
//             const groupsSnapshot = await getDocs(groupsQuery);

//             if (groupsSnapshot.empty) {
//                 // Create new group if not exist
//                 await addDoc(collection(db, 'groups'), {
//                     courseName,
//                     members: [user.uid],
//                 });
//             } else {
//                 // Get the group document
//                 const groupDoc = groupsSnapshot.docs[0];
//                 const groupRef = doc(db, 'groups', groupDoc.id);

//                 // Update the existing group with the new user id.
//                 await updateDoc(groupRef, {
//                   members: arrayUnion(user.uid),
//                 });
//             }

//             alert('Signup successful! Please log in.');
//             navigate('/login');
//         } catch (error) {
//             console.error('Signup failed:', error);
//             alert('Signup failed. Please try again.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="p-6">
//             <h1 className="text-2xl font-bold">Campus Connect Signup</h1>
//             <form
//                 onSubmit={(e) => {
//                     e.preventDefault();
//                     handleSignup();
//                 }}
//                 className="space-y-4 mt-4"
//             >
//                 <input
//                     type="text"
//                     placeholder="Name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     className="w-full p-2 border rounded"
//                 />
//                 <input
//                     type="text"
//                     placeholder="Course Name"
//                     value={courseName}
//                     onChange={(e) => setCourseName(e.target.value)}
//                     className="w-full p-2 border rounded"
//                 />
//                 <input
//                     type="text"
//                     placeholder="Enrollment ID"
//                     value={enrollmentId}
//                     onChange={(e) => setEnrollmentId(e.target.value)}
//                     className="w-full p-2 border rounded"
//                 />
//                 <input
//                     type="email"
//                     placeholder="Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="w-full p-2 border rounded"
//                 />
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="w-full p-2 border rounded"
//                 />
//                 <button
//                     type="submit"
//                     disabled={loading}
//                     className="bg-blue-500 text-white px-4 py-2 rounded"
//                 >
//                     {loading ? 'Signing up...' : 'Signup'}
//                 </button>
//             </form>
//         </div>
//     );
// }

// function Login() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     const handleLogin = async () => {
//         setLoading(true);
//         try {
//             const userCredential = await signInWithEmailAndPassword(auth, email, password);
//             const user = userCredential.user;

//             // Fetch user data
//             const q = query(collection(db, 'users'), where('uid', '==', user.uid));
//             const querySnapshot = await getDocs(q);
//             if (querySnapshot.empty) {
//                 alert('User not found. Please sign up.');
//                 return;
//             }

//             const userData = querySnapshot.docs[0].data();

//             // Fetch the group for this user's course
//             const groupQuery = query(collection(db, 'groups'), where('courseName', '==', userData.courseName));
//             const groupSnapshot = await getDocs(groupQuery);

//             if(!groupSnapshot.empty){
//               // Get the group document
//               const groupDoc = groupSnapshot.docs[0];
//               const groupRef = doc(db, 'groups', groupDoc.id);

//               if(!groupDoc.data().members.includes(user.uid)) {
//                 // Update the existing group with the new user id.
//                 await updateDoc(groupRef, {
//                   members: arrayUnion(user.uid),
//                 });
//               }
//             }


//             localStorage.setItem('user', JSON.stringify(userData));
//             navigate('/chat');
//         } catch (error) {
//             console.error('Login failed:', error);
//             alert('Login failed. Please try again.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="p-6">
//             <h1 className="text-2xl font-bold">Campus Connect Login</h1>
//             <form
//                 onSubmit={(e) => {
//                     e.preventDefault();
//                     handleLogin();
//                 }}
//                 className="space-y-4 mt-4"
//             >
//                 <input
//                     type="email"
//                     placeholder="Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="w-full p-2 border rounded"
//                 />
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="w-full p-2 border rounded"
//                 />
//                 <button
//                     type="submit"
//                     disabled={loading}
//                     className="bg-blue-500 text-white px-4 py-2 rounded"
//                 >
//                     {loading ? 'Logging in...' : 'Login'}
//                 </button>
//             </form>
//             <p className="mt-4">
//                 Don't have an account? <Link to="/signup" className="text-blue-500">Sign up here</Link>.
//             </p>
//         </div>
//     );
// }

// function Chat() {
//     const [groups, setGroups] = useState([]);
//     const [messages, setMessages] = useState([]);
//     const [currentGroup, setCurrentGroup] = useState(null);
//     const [newMessage, setNewMessage] = useState('');
//     const user = JSON.parse(localStorage.getItem('user'));
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchGroups = async () => {
//             const q = query(collection(db, 'groups'), where('courseName', '==', user.courseName));
//             const querySnapshot = await getDocs(q);
//             const fetchedGroups = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//             setGroups(fetchedGroups);
//         };

//         fetchGroups();
//     }, [user.courseName]);

//     const fetchMessages = async (groupId) => {
//         const q = query(collection(db, 'messages'), where('groupId', '==', groupId));
//         const querySnapshot = await getDocs(q);
//         const fetchedMessages = querySnapshot.docs.map(doc => doc.data());
//         setMessages(fetchedMessages);
//     };

//     const sendMessage = async () => {
//         if (!newMessage.trim()) return;

//         try {
//             const messageData = {
//                 groupId: currentGroup.id,
//                 sender: user.name,
//                 content: newMessage,
//                 timestamp: new Date(),
//             };
//             await addDoc(collection(db, 'messages'), messageData);
//             setMessages([...messages, messageData]);
//             setNewMessage('');
//         } catch (error) {
//             console.error('Failed to send message:', error);
//         }
//     };

//     const handleLogout = async () => {
//         try {
//             await signOut(auth);
//             localStorage.removeItem('user');
//             navigate('/login');
//         } catch (error) {
//             console.error('Logout failed:', error);
//         }
//     };

//     return (
//         <div className="p-6 flex">
//             <div className="w-1/4 border-r pr-4">
//                 <h2 className="text-xl font-bold">Groups</h2>
//                 <ul className="mt-4 space-y-2">
//                     {groups.map((group) => (
//                         <li
//                             key={group.id}
//                             className={`p-2 rounded cursor-pointer ${currentGroup?.id === group.id ? 'bg-gray-300' : 'bg-gray-100'}`}
//                             onClick={() => {
//                                 setCurrentGroup(group);
//                                 fetchMessages(group.id);
//                             }}
//                         >
//                             {group.courseName}
//                         </li>
//                     ))}
//                 </ul>
//                 <button
//                     onClick={handleLogout}
//                     className="mt-4 bg-red-500 text-white px-4 py-2 rounded w-full"
//                 >
//                     Logout
//                 </button>
//             </div>
//             <div className="w-3/4 pl-4">
//                 {currentGroup ? (
//                     <div>
//                         <h2 className="text-xl font-bold mb-4">Chat - {currentGroup.courseName}</h2>
//                         <div className="h-64 overflow-y-scroll border p-4 mb-4">
//                             {messages.map((msg, index) => (
//                                 <div key={index} className="mb-2">
//                                     <strong>{msg.sender}:</strong> {msg.content}
//                                 </div>
//                             ))}
//                         </div>
//                         <div className="flex">
//                             <input
//                                 type="text"
//                                 placeholder="Type your message..."
//                                 value={newMessage}
//                                 onChange={(e) => setNewMessage(e.target.value)}
//                                 className="flex-1 p-2 border rounded"
//                             />
//                             <button
//                                 onClick={sendMessage}
//                                 className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
//                             >
//                                 Send
//                             </button>
//                         </div>
//                     </div>
//                 ) : (
//                     <h2 className="text-xl font-bold">Select a group to chat</h2>
//                 )}
//             </div>
//         </div>
//     );
// }

// // Main App Component
// function App() {
//     return (
//         <Router>
//             <div className="container mx-auto">
//                 <nav className="p-4 bg-gray-200">
//                     <Link to="/" className="mr-4">Home</Link>
//                     <Link to="/signup" className="mr-4">Signup</Link>
//                     <Link to="/login">Login</Link>
//                 </nav>
//                 <Routes>
//                     <Route path="/" element={<h1 className="text-2xl font-bold">Welcome to Campus Connect</h1>} />
//                     <Route path="/signup" element={<Signup />} />
//                     <Route path="/login" element={<Login />} />
//                     <Route path="/chat" element={<Chat />} />
//                 </Routes>
//             </div>
//         </Router>
//     );
// }
// export default App;