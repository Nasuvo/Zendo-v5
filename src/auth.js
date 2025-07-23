import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./firebase";

const signUp = async (email, password, name, role) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    try {
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        role,
        createdAt: serverTimestamp(),
      });
    } catch (dbError) {
      console.error("Error creating user document:", dbError);
      // Optionally, you might want to delete the user from Auth if Firestore write fails
      // await user.delete();
      throw dbError;
    }
    return user;
  } catch (authError) {
    console.error("Error signing up:", authError.code, authError.message);
    throw authError;
  }
};

export { signUp };
