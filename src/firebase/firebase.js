import * as firebase from "firebase/app";
import 'firebase/database'
import { getDatabase } from "firebase/database";

import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA4chKxoj1an3ENg1zF8mOTR9kYbDnssl4",
    authDomain: "darma-bangsa-news.firebaseapp.com",
    databaseURL: "https://darma-bangsa-news-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "darma-bangsa-news",
    storageBucket: "darma-bangsa-news.appspot.com",
    messagingSenderId: "1051057724673",
    appId: "1:1051057724673:web:73a28aede412909d520f00",
    measurementId: "G-XDW1W2PETB"
};

// Initialize Firebase
// firebase.initializeApp(firebaseConfig)
// const databaseRef = firebase
// export const notesRef = databaseRef
// export default firebase


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);