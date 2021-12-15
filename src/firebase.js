// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut } from "firebase/auth";
import {
  getDatabase,
  set,
  get,
  push,
  remove,
  ref,
  onValue,
  onChildAdded,
  child,
} from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDr3ElFQsV-C9V_CogGNtq35lKCRS0ZHTU",
  authDomain: "hotel-management-system-76e1a.firebaseapp.com",
  projectId: "hotel-management-system-76e1a",
  storageBucket: "hotel-management-system-76e1a.appspot.com",
  messagingSenderId: "890838913844",
  appId: "1:890838913844:web:9864ae485a8ff7588d4b61",
  measurementId: "G-8NDCLFH1Z2"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getDatabase(app);

export {auth,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,db,set,push,remove,ref,onValue,onChildAdded,child,get}












