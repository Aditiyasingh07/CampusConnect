// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth, db } from '../../firebaseConfig'; // Import auth and db from firebaseConfig
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Navbar from '../Navbar/Navbar';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const q = query(collection(db, 'users'), where('uid', '==', user.uid));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                alert('User  not found. Please sign up.');
                return;
            }

            const userData = querySnapshot.docs[0].data();
            localStorage.setItem('user', JSON.stringify(userData));
            navigate('/chat');
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <Navbar />
        <div className="p-6">
            <h1 className="text-2xl font-bold">Campus Connect Login</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleLogin();
                }}
                className="space-y-4 mt-4"
            >
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded" />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded" />
                <button type="submit" disabled={loading} className="bg-blue-500 text-white px-4 py-2 rounded">
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            <p className="mt-4">
                Don't have an account? <Link to="/signup" className="text-blue-500">Sign up here</Link>.
            </p>
        </div>
        </>
    );
}

export default Login;