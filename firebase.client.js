// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBWjkhbGh6P0a95L7F8PKZG4x54QSZUX7w",
    authDomain: "dealermanagementservice-a3713.firebaseapp.com",
    projectId: "dealermanagementservice-a3713",
    storageBucket: "dealermanagementservice-a3713.appspot.com",
    messagingSenderId: "308661437663",
    appId: "1:308661437663:web:d4f94099bccb978766956a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
// export const storage = getStorage(app);
export const db = getFirestore(app);
