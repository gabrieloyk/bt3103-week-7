import firebase from "firebase"

  var firebaseConfig = {
    apiKey: "AIzaSyBxTC-W1fLq-tyDEnU1dsikh4MpBe0n8z8",
    authDomain: "bt3103-week-6-15608.firebaseapp.com",
    projectId: "bt3103-week-6-15608",
    storageBucket: "bt3103-week-6-15608.appspot.com",
    messagingSenderId: "465290790597",
    appId: "1:465290790597:web:2939ccdb98de24602492ac",
    measurementId: "G-DW97GDESSR"
  };

firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;