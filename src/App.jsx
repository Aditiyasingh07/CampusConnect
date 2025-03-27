import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Review from './components/Review/Review';
import Chat from './components/Chat/Chat';
import Events from './components/Events/Events';
import Memories from './components/Memories/Memories';
import Home from './components/Home/Home';
import ItFest from './components/Memories/sub-memo/ItFest';
import Cric from './components/Memories/sub-memo/Cric';
import Olp from './components/Memories/sub-memo/Olp';
import All from './components/Memories/sub-memo/All';

function MouseBallTracker() {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div
            className="pointer-events-none fixed top-0 left-0 w-full h-full"
            style={{ zIndex: 50 }}
        >
            <div
                className="absolute bg-gradient-to-r from-slate-800 to-indigo-800 rounded-full h-7 w-7 shadow-lg"
                style={{
                    transform: `translate(${position.x - 0}px, ${position.y - 0}px)`,
                }}
            ></div>
        </div>
    );
}

function App() {
    return (
        <Router>
            <div className=" container relative">
                <MouseBallTracker />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/memories" element={<Memories />} />
                    <Route path="/itfest" element={<ItFest/>} />
                    <Route path="/cric" element={<Cric/>} />
                    <Route path="/olp" element={<Olp/>} />
                    <Route path="/all" element={<All/>} />
                    <Route path="/review" element={<Review/>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
