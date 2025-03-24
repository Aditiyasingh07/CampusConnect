import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBQAmDfBs4Dz2w1A3hBaEILD_bQOEGbL94",
    authDomain: "campusconnect-b4df3.firebaseapp.com",
    projectId: "campusconnect-b4df3",
    storageBucket: "campusconnect-b4df3.firebasestorage.app",
    messagingSenderId: "4057338049",
    appId: "1:4057338049:web:0bdb494394de4da4010440",
    measurementId: "G-EMMV5WMX8M"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };