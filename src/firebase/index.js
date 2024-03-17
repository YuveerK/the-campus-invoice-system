import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

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
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
