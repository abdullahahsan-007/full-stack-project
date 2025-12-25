import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_EiqjcTeEER1_uUCNdazT93zftPeg80s",
  authDomain: "fullstack-project-629d7.firebaseapp.com",
  projectId: "fullstack-project-629d7",
  storageBucket: "fullstack-project-629d7.firebasestorage.app",
  messagingSenderId: "432073443752",
  appId: "1:432073443752:web:844ccccfbd0396e815759d",
  measurementId: "G-PD7SWDYVCC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
// const db = getFirestore(app);

// Initialize Auth
const auth = getAuth(app);

export { app, db, auth };
