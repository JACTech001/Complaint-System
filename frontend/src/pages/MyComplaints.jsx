import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { getComplaints } from "../services/complaintService";
import "./MyComplaints.module.css";
import ComplaintCard from "../components/ComplaintCard";

const MyComplaints = () => {
  const { user } = useUser();
  const [myComplaints, setMyComplaints] = useState([]);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      const data = await getComplaints();
      const studentComplaints = data.filter(c => c.studentId === user.id);
      setMyComplaints(studentComplaints);
    };
    fetchData();
  }, [user]);

  return (
    <div className="my-complaints">
      <h2>My Complaints</h2>
      {myComplaints.length === 0 ? (
        <p className="no-complaints">No complaints submitted yet.</p>
      ) : (
        myComplaints.map(c => (
          <ComplaintCard key={c.id} complaint={c} showResponseForm={false} />
        ))
      )}
    </div>
  );
};

export default MyComplaints;
