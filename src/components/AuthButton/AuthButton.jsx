// src/components/AuthButtons.js
import React, { useState, useEffect } from 'react';
import { auth } from '../../firebaseConfig';
import { useNavigate, Link } from 'react-router-dom';

function AuthButtons() {
    const [user, setUser ] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser (user);
        });

        return () => unsubscribe(); 
    }, []);

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
        <div>
            {user ? (
                <button onClick={handleLogout} className=" btn-glass-card text-white text-2xl hover:text-[20px] font-semibold px-4 py-2 h-15 w-40 logout-btn rounded-4xl">
                    Logout
                </button>
            ) : (
                <div className=" flex flex-col gap-5 mt-10 space-x-4">
                    <button className=" bg-transprent btn-glass-card text-white px-4 py-2 font-semibold rounded h-15 w-30 text-2xl hover:text-[20px]">
                        <Link to="/login">Login</Link>
                    </button>
                    <button className="bg-green-500 btn-glass-card h-15 w-30 text-2xl hover:text-[20px] font-semibold text-white px-4 py-2 rounded">
                    <Link to="/signup">Signup</Link>
                    </button>
                </div>
            )}
        </div>
    );
}

export default AuthButtons;