// Firebase App (the core Firebase SDK) is always required and must be listed
// first
import * as firebase from "firebase";

// Add the Firebase products that you want to use
// import "firebase/auth";
// import "firebase/database";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
};

// Initialize Firebase
firebase.initializeApp( firebaseConfig );
export const store = firebase.firestore();

export default firebase;