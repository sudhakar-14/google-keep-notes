// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6wcuOcu0UGL5SkZ69Phez7_If3cjFzrU",
  authDomain: "keep-notes-6ff9e.firebaseapp.com",
  databaseURL: "https://keep-notes-6ff9e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "keep-notes-6ff9e",
  storageBucket: "keep-notes-6ff9e.appspot.com",
  messagingSenderId: "1098487586499",
  appId: "1:1098487586499:web:237fc7eca59f19ff048c76",
  measurementId: "G-02NPN8DHQE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app)
const auth = getAuth(app)
export {db,auth}



