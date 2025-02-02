// src/components/AuthButtons.js
import React, { useState, useEffect } from 'react';
import { auth } from '../../firebaseConfig'; // Import your Firebase auth
import { useNavigate, Link } from 'react-router-dom';

function AuthButtons() {
    const [user, setUser ] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser (user);
        });

        return () => unsubscribe(); // Clean up subscription on unmount
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
                <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
                    Logout
                </button>
            ) : (
                <div className=" flex space-x-4">
                    <button className=" bg-transprent btn-glass-card text-white px-4 py-2 rounded h-12 w-23">
                        <Link to="/login">Login</Link>
                    </button>
                    <button className="bg-green-500 btn-glass-card h-12 w-23 text-white px-4 py-2 rounded">
                    <Link to="/signup">Signup</Link>
                    </button>
                </div>
            )}
        </div>
    );
}

export default AuthButtons;