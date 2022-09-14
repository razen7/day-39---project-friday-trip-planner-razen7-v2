// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCx1XfnNZtCFuNCbyEGgcBgXK_fjtIV0pg",
    authDomain: "trip-planner---v2.firebaseapp.com",
    projectId: "trip-planner---v2",
    storageBucket: "trip-planner---v2.appspot.com",
    messagingSenderId: "566794447308",
    appId: "1:566794447308:web:610a38ec2906a814ac1569"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);