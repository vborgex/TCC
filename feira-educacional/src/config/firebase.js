import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBEir6wapVT8UAGAgF6dMxa5SqP-rGcBUc",
  authDomain: "saggio-4ab2a.firebaseapp.com",
  projectId: "saggio-4ab2a",
  storageBucket: "saggio-4ab2a.firebasestorage.app",
  messagingSenderId: "354696275489",
  appId: "1:354696275489:web:10d08698488ba2e4196560"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
