import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: "fir-concept-71fdf.firebaseapp.com",
  projectId: "fir-concept-71fdf",
  storageBucket: "fir-concept-71fdf.appspot.com",
  messagingSenderId: "433409448129",
  appId: "1:433409448129:web:4ac005f3dbca9d8dbb9c40",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const usersTable = collection(database, "users");

export default app;
