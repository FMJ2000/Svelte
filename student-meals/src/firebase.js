import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCk54IE6NlnN6wMKStk26KS1F7P0E4KHPY",
  authDomain: "student-meals-53f78.firebaseapp.com",
  projectId: "student-meals-53f78",
  storageBucket: "student-meals-53f78.appspot.com",
  messagingSenderId: "280965208618",
  appId: "1:280965208618:web:496e5fe71a0a37f8ffc153",
  measurementId: "G-CTD4GSHWFW"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
enableIndexedDbPersistence(db);