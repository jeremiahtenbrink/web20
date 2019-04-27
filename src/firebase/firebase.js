// Firebase App (the core Firebase SDK) is always required and must be listed
// first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBuFtu0MBWZkGu8FFWS_UWYLm1Q6ht3DqE",
    authDomain: "pm-dashboard-ec3da.firebaseapp.com",
    databaseURL: "https://pm-dashboard-ec3da.firebaseio.com",
    projectId: "pm-dashboard-ec3da",
    storageBucket: "pm-dashboard-ec3da.appspot.com",
    messagingSenderId: "954956417413"
};

// Initialize Firebase
firebase.initializeApp( firebaseConfig );

const database = firebase.database();
export default database;