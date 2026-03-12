// src/firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfEGRlnmUu6GWMQE9U6bsV5IsdeySZSxQ",
  authDomain: "complaintsystem-276b1.firebaseapp.com",
  projectId: "complaintsystem-276b1",
  storageBucket: "complaintsystem-276b1.firebasestorage.app",
  messagingSenderId: "503648785197",
  appId: "1:503648785197:web:4747423eacc230101b39a4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore database instance
export const db = getFirestore(app);
