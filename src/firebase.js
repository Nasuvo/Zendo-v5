import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA7f1lDCsq4VDiStNeHgeX9gTbdPJtGyaY",
  authDomain: "zendo-4736e.firebaseapp.com",
  projectId: "zendo-4736e",
  storageBucket: "zendo-4736e.appspot.com",
  messagingSenderId: "534100857526",
  appId: "1:534100857526:web:5829445970e72ce594cc17",
  measurementId: "G-EKG5KRPFSC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
