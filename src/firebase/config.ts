import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration from your project
const firebaseConfig = {
  apiKey: "AIzaSyCkIUcEPA6rN_b-Cvnomso1B-4mSxmACUo",
  authDomain: "dressify-b3b82.firebaseapp.com",
  projectId: "dressify-b3b82",
  storageBucket: "dressify-b3b82.firebasestorage.app",
  messagingSenderId: "337593906590",
  appId: "1:337593906590:web:a3e80c261108f827d9128f",
  measurementId: "G-5XST8WWHE6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export { app, analytics };
