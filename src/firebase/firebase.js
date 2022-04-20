import * as firebase from "firebase/app";
import 'firebase/database'

import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getMessaging, getToken, onMessage } from "firebase/messaging";


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
export const auth = getAuth(app);
export const dbrealtime = getDatabase(app);
// export const messaging = getMessaging(app);
// export async function getFCMToken() {
//     try {
//         // Don't forget to paste your VAPID key here
// 		// (you can find it in the Console too)
//         const token = await getToken(messaging, { vapidKey: "BHhDQQ2eKLnRmNld6LWypIy-GQ2zCssWmrtIaTnFa3ZfR3Q4vkT2xjXqk2UQqZiM3KvMhurgeWTkvocdubsNheg" });
//         return token;
//     } catch (e) {
//         console.log('getFCMToken error', e);
//         return undefined
//     }
// }