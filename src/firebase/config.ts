import { initializeApp, getApps } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCkIUcEPA6rN_b-Cvnomso1B-4mSxmACUo",
  authDomain: "dressify-b3b82.firebaseapp.com",
  projectId: "dressify-b3b82",
  storageBucket: "dressify-b3b82.firebasestorage.app",
  messagingSenderId: "337593906590",
  appId: "1:337593906590:web:a3e80c261108f827d9128f",
  measurementId: "G-5XST8WWHE6"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

let analytics = null;
if (typeof window !== 'undefined') {
  isSupported().then(yes => {
    if (yes) analytics = getAnalytics(app);
  });
}

export { app, analytics };
