import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4LutfPer5o7O5HcriaqiGszLwGSpJVyY",
  authDomain: "project-e4e60.firebaseapp.com",
  projectId: "project-e4e60",
  storageBucket: "project-e4e60.appspot.com",
  messagingSenderId: "74070934249",
  appId: "1:74070934249:web:9c2b126af945041d41e678",
  measurementId: "G-ZWSEYCRPGT",
};

const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore();
