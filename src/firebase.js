import { initializeApp } from "firebase/app";
import { getAuth, EmailAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, serverTimestamp, collection } from "firebase/firestore";

console.log(process.env.REACT_APP_FIREBASE_AUTH_DOMAIN);
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // // databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);


const db = new getFirestore(app);




export const auth = getAuth();

export const googleProvider = new GoogleAuthProvider();

export const emailProvider = new EmailAuthProvider();

export default app;


