import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCPgtpaQ_Ndyu-zCgepzpXbHVVOUYg0Joc",
  authDomain: "pantrytracker-bad71.firebaseapp.com",
  projectId: "pantrytracker-bad71",
  storageBucket: "pantrytracker-bad71.appspot.com",
  messagingSenderId: "357521567314",
  appId: "1:357521567314:web:2d71a14f8bd917245db98b",
  measurementId: "G-ZLDJMEQXVL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export { app, firestore }