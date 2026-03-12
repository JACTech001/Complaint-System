import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {

  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {

    const checkRole = async () => {
      if (!user) return;

      const ref = doc(db, "users", user.id);
      const snapshot = await getDoc(ref);

      if (snapshot.exists()) {
        const data = snapshot.data();
        if (data.role === "admin") {
          setIsAdmin(true);
        }
      }

      setLoading(false);
    };

    checkRole();
  }, [user]);

  if (loading) return <p>Loading...</p>;

  if (!isAdmin) return <Navigate to="/" />;

  return children;
};

export default AdminRoute;
