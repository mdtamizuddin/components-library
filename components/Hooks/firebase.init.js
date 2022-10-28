import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdDlCSxdz6dpmoeSM11kxxMuI6LuM0Tyc",
  authDomain: "code-house-edbb3.firebaseapp.com",
  projectId: "code-house-edbb3",
  storageBucket: "code-house-edbb3.appspot.com",
  messagingSenderId: "172388795452",
  appId: "1:172388795452:web:4b3dfb936bfb018861af39",
  measurementId: "G-8FPQ22Y60Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export default auth;
