import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBqUoc33Li0BKqTq3ndnygDnpZ2FAYm8PY",
  authDomain: "bart-bong-ai.firebaseapp.com",
  projectId: "bart-bong-ai",
  storageBucket: "bart-bong-ai.firebasestorage.app",
  messagingSenderId: "1098379757653",
  appId: "1:1098379757653:web:a2b2d3ab09d6456392acdc",
  measurementId: "G-9B6XNE5L6F",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };
