import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAuzNSovmX8LIUOc_-kd4SDfDxRHxvzOBw",
  authDomain: "tech-challenge-2ccfa.firebaseapp.com",
  databaseURL: "https://tech-challenge-2ccfa-default-rtdb.firebaseio.com",
  projectId: "tech-challenge-2ccfa",
  storageBucket: "tech-challenge-2ccfa.appspot.com",
  messagingSenderId: "86171447930",
  appId: "1:86171447930:web:971b048d434b29148f81c3",
  measurementId: "G-G0BVD9TL2F"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

export {auth};