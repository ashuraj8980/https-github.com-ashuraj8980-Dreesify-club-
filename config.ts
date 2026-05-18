import { initializeApp, getApps } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCbVpIdVDA_mvFWU8cMzipn4k8Bry1tw0s",
  authDomain: "dreesify.firebaseapp.com",
  databaseURL: "https://dreesify-default-rtdb.firebaseio.com",
  projectId: "dreesify",
  storageBucket: "dreesify.firebasestorage.app",
  messagingSenderId: "57429162105",
  appId: "1:57429162105:web:8c613ec3cd49c67eebfca8",
  measurementId: "G-2FBKQL6WK7"
};

// Prevent duplicate Firebase app initialization
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Analytics only in browser
let analytics = null;
if (typeof window !== 'undefined') {
  isSupported().then(yes => {
    if (yes) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, analytics };
