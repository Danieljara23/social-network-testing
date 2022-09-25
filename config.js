import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  updateDoc,
  doc
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBKDYCF3xyjqNcZGWib6zxPBvLKcgSaZxI",
  authDomain: "social-network-52b0a.firebaseapp.com",
  databaseURL: "https://social-network-52b0a-default-rtdb.firebaseio.com",
  projectId: "social-network-52b0a",
  storageBucket: "social-network-52b0a.appspot.com",
  messagingSenderId: "846879264722",
  appId: "1:846879264722:web:0f3e4bc7efd99d2c3f020b",
  measurementId: "G-9J6NFE0WJV"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db, collection, getDocs, getDoc, doc, updateDoc };
