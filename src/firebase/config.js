import firebase from "firebase/compat/app";

import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyB-GiOz2ATjUIQOdOByzLkWVRPF4zBXvck",
    authDomain: "chat-app-fa1e6.firebaseapp.com",
    projectId: "chat-app-fa1e6",
    storageBucket: "chat-app-fa1e6.appspot.com",
    messagingSenderId: "546723364588",
    appId: "1:546723364588:web:c99618b18de31bb90cafc9",
    measurementId: "G-G8582WTZ9H"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };
export default firebase;