
// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHvq-qnhgTzdZ-DHR6IPyHMf3LT4KlE6k",
  authDomain: "quiz-app-d3c3b.firebaseapp.com",
  projectId: "quiz-app-d3c3b",
  storageBucket: "quiz-app-d3c3b.appspot.com",
  messagingSenderId: "1005356848772",
  appId: "1:1005356848772:web:f201c0223a3e6c4495d4d1"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()

export { auth };