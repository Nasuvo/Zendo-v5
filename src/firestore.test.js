import { db } from "./firebase.js";
import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";

const testFirestore = async () => {
  console.log("Running Firestore test...");
  const testId = "test-user";
  const testData = {
    name: "Test User",
    email: "test@example.com",
    role: "buyer",
    createdAt: new Date(),
  };

  try {
    // Write data
    await setDoc(doc(db, "users", testId), testData);
    console.log("Write successful");

    // Read data
    const docSnap = await getDoc(doc(db, "users", testId));
    if (docSnap.exists()) {
      console.log("Read successful:", docSnap.data());
    } else {
      console.error("Read failed: Document does not exist");
    }

    // Delete data
    await deleteDoc(doc(db, "users", testId));
    console.log("Delete successful");
  } catch (error) {
    console.error("Firestore test failed:", error);
  }
};

testFirestore();
