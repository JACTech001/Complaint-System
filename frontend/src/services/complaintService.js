import { collection, addDoc, getDocs, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";

// Submit new complaint
export const submitComplaint = async (data) => {
  await addDoc(collection(db, "complaints"), {
    ...data,
    status: "pending",
    adminResponse: "",
    createdAt: serverTimestamp()
  });
};

// Get all complaints
export const getComplaints = async () => {
  const snapshot = await getDocs(collection(db, "complaints"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Update complaint response (admin only)
export const updateComplaint = async (id, response, status) => {
  const ref = doc(db, "complaints", id);
  await updateDoc(ref, { adminResponse: response, status });
};
