// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig2 = {
  apiKey: "AIzaSyCsCsnnu3G0URudpjCkpcKhyX47o0WCAdI",
  authDomain: "reactchatonetoone.firebaseapp.com",
  databaseURL: "http://reactchatonetoone.firebaseapp.com",
  projectId: "reactchatonetoone",
  storageBucket: "reactchatonetoone.appspot.com",
  messagingSenderId: "952920489963",
  appId: "1:952920489963:web:0b9fb4871ba5db3671e3ae",



  // apiKey: "AIzaSyDzOaOi4cNSXfjgRLrhelezhUlNwoRoW1A",
  // authDomain: "chat-final-a1783.firebaseapp.com",
  // databaseURL: "https://chat-final-a1783-default-rtdb.firebaseio.com",
  // projectId: "chat-final-a1783",
  // storageBucket: "chat-final-a1783.appspot.com",
  // messagingSenderId: "1076086394581",
  // appId: "1:1076086394581:web:1ff0172f0f5bd3cc499c5c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig2);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
