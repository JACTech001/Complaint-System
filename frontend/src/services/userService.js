import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const createUser = async (user) => {

  const userRef = doc(db, "users", user.id);
  const existingUser = await getDoc(userRef);

  // Prevent overwriting existing user
  if (!existingUser.exists()) {
    await setDoc(userRef, {
      name: user.fullName,
      email: user.primaryEmailAddress.emailAddress,
      role: "student", // default role
      createdAt: serverTimestamp(),
    });
  }
};
