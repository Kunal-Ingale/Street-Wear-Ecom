// src/Firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
// // Debugging logs
// console.log('Firebase API Key:', import.meta.env.VITE_FIREBASE_API_KEY);
// console.log('Firebase Auth Domain:', import.meta.env.VITE_FIREBASE_AUTH_DOMAIN);
// console.log('Firebase Project ID:', import.meta.env.VITE_FIREBASE_PROJECT_ID);
// console.log('Firebase Storage Bucket:', import.meta.env.VITE_FIREBASE_STORAGE_BUCKET);
// console.log('Firebase Messaging Sender ID:', import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID);
// console.log('Firebase App ID:', import.meta.env.VITE_FIREBASE_APP_ID);
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
