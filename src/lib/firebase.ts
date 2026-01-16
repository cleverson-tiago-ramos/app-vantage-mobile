// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA_UvcqGsmqVTfiQ4PyVwpfOKUrUFQLTC8",
  authDomain: "vantageapp-72c73.firebaseapp.com",
  projectId: "vantageapp-72c73",
  storageBucket: "vantageapp-72c73.firebasestorage.app",
  messagingSenderId: "802360480098",
  appId: "1:802360480098:web:8a30f58caf57e42a0ddc3b",
};

const app = initializeApp(firebaseConfig);

// Firebase Auth apenas para login
export const auth = getAuth(app);
