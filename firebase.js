import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCl7A4eMLNMEpJjAikMxyMfYdTvS1-_9po",
  authDomain: "amazora.firebaseapp.com",
  projectId: "amazora",
  storageBucket: "amazora.appspot.com",
  messagingSenderId: "433062187807",
  appId: "1:433062187807:web:a73b173f8df8cc303c162a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;