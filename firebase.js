const firebaseConfig = {
apiKey: "AIzaSyDjHiixGPZyjXxidghaK5yMJlRJFWRueb0",
  authDomain: "astrolegacy-39489.firebaseapp.com",
  projectId: "astrolegacy-39489",
  storageBucket: "astrolegacy-39489.firebasestorage.app",
  messagingSenderId: "971080252671",
  appId: "1:971080252671:web:57474f369278600d31a0ca",
  measurementId: "G-MZG1J0P2ZE"
 };
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();