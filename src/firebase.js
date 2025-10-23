// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDPnFn5DwEdP5RdGOcq71NulOw_OzYcqaM',
  authDomain: 'once-gallery-2025.firebaseapp.com',
  projectId: 'once-gallery-2025',
  storageBucket: 'once-gallery-2025.firebasestorage.app',
  messagingSenderId: '1029413358173',
  appId: '1:1029413358173:web:bea759daf8c2e95724dbb4',
  measurementId: 'G-9MFF624CGT',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
