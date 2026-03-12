import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { getComplaints } from "../services/complaintService";
import Sidebar from "../components/Sidebar";
import styles from "./StudentDashboard.module.css";

const StudentDashboard = () => {
  const { user } = useUser();
  const [complaints, setComplaints] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  useEffect(() => {
    if (!user) return;
    const fetchComplaints = async () => {
      const data = await getComplaints();
      setComplaints(data.filter(c => c.studentId === user.id));
      setLoading(false);
    };
    fetchComplaints();
  }, [user]);

  const filteredComplaints = complaints.filter(c =>
    filterStatus === "all" ? true : c.status === filterStatus
  );

  const stats = {
    total: complaints.length,
    pending: complaints.filter(c => c.status === "pending").length,
    resolved: complaints.filter(c => c.status === "resolved").length,
    rejected: complaints.filter(c => c.status === "rejected").length,
  };

  const links = [
    { to: "/", label: "Dashboard" },
    { to: "/submit", label: "Submit Complaint" }
  ];

  return (
    <div className={styles.container}>
      <Sidebar isOpen={sidebarOpen} toggle={toggleSidebar} links={links} />
      <button className={styles.menuBtn} onClick={toggleSidebar}>☰</button>

      <div className={styles.dashboardContent}>
        <h2>Welcome, {user?.fullName}</h2>

        {/* Stats */}
        <div className={styles.stats}>
          <div className={styles.card}>Total: {stats.total}</div>
          <div className={styles.card}>Pending: {stats.pending}</div>
          <div className={styles.card}>Resolved: {stats.resolved}</div>
          <div className={styles.card}>Rejected: {stats.rejected}</div>
        </div>

        {/* Filter */}
        <div className={styles.filter}>
          <label>Filter:</label>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="resolved">Resolved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Complaints List */}
        {loading ? <p>Loading...</p> :
          filteredComplaints.length === 0 ? <p>No complaints found.</p> :
          filteredComplaints.map(c => (
            <div key={c.id} className={styles.card}>
              <h4>{c.title}</h4>
              <p><strong>Status:</strong> {c.status}</p>
              <p><strong>Description:</strong> {c.description}</p>
              <p><strong>Response:</strong> {c.adminResponse || "None yet"}</p>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default StudentDashboard;
