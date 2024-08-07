import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCeu29ufY-b2PjVk9cx7Ifoh4wDNwOeRYI",
  authDomain: "voluntrr-2bb0d.firebaseapp.com",
  projectId: "voluntrr-2bb0d",
  storageBucket: "voluntrr-2bb0d.appspot.com",
  messagingSenderId: "86630741428",
  appId: "1:86630741428:web:5f9bbbc01256c6cce96ee1",
  measurementId: "G-8MT3CHGSW2",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(); 
export default app;
