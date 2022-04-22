import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4-jlTz1qe04L2vQSBwru1H3f8EgEkz8M",
  authDomain: "movie-time-286a9.firebaseapp.com",
  projectId: "movie-time-286a9",
  storageBucket: "movie-time-286a9.appspot.com",
  messagingSenderId: "1041867214130",
  appId: "1:1041867214130:web:d9a286c5e1d04889985b2b"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }