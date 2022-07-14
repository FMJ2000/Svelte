import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC5lx2juoTidAuYhQhk9_C4DNih8thrCsY",
  authDomain: "sveltetodo-4d505.firebaseapp.com",
  projectId: "sveltetodo-4d505",
  storageBucket: "sveltetodo-4d505.appspot.com",
  messagingSenderId: "430707810439",
  appId: "1:430707810439:web:070f61ef5f38b06be55822",
  measurementId: "G-HZ7800XR33"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const analytics = getAnalytics(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);