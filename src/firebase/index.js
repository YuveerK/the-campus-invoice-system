// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFIeNXLtTsUmLCMw0FjIDFcekAZpufK8s",
  authDomain: "the-campus-invoice-system.firebaseapp.com",
  projectId: "the-campus-invoice-system",
  storageBucket: "the-campus-invoice-system.appspot.com",
  messagingSenderId: "169322290778",
  appId: "1:169322290778:web:c0b923ce42a59c70724263",
  measurementId: "G-V731E9NC7D",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
