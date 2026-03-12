import React, { useEffect, useState } from "react";
import { getComplaints, updateComplaint } from "../services/complaintService";
import Sidebar from "../components/Sidebar";
import styles from "./AdminDashboard.module.css";

const AdminDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [responses, setResponses] = useState({});
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const data = await getComplaints();
        setComplaints(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, []);

  const handleResponseChange = (id, value) => {
    setResponses(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmitResponse = async (id) => {
    if (!responses[id]) return alert("Enter a response");
    await updateComplaint(id, responses[id], "resolved");
    alert("Response sent");
    setResponses(prev => ({ ...prev, [id]: "" }));
    const updated = await getComplaints();
    setComplaints(updated);
  };

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
    { to: "/admin", label: "Admin" }
  ];

  return (
    <div className={styles.container}>
      <Sidebar isOpen={sidebarOpen} toggle={toggleSidebar} links={links} />
      <button className={styles.menuBtn} onClick={toggleSidebar}>☰</button>

      <div className={styles.dashboardContent}>
        <h2>Admin Dashboard</h2>

        {/* Stats */}
        <div className={styles.stats}>
          <div className={styles.card}>Total: {stats.total}</div>
          <div className={styles.card}>Pending: {stats.pending}</div>
          <div className={styles.card}>Resolved: {stats.resolved}</div>
          <div className={styles.card}>Rejected: {stats.rejected}</div>
        </div>

        {/* Filter */}
        <div className={styles.filter}>
          <label>Status:</label>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="resolved">Resolved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Complaints */}
        {loading ? <p>Loading...</p> :
          filteredComplaints.length === 0 ? <p>No complaints found.</p> :
          filteredComplaints.map(c => (
            <div key={c.id} className={styles.card}>
              <h4>{c.title}</h4>
              <p><strong>Student:</strong> {c.studentName}</p>
              <p><strong>Status:</strong> {c.status}</p>
              <p><strong>Description:</strong> {c.description}</p>
              <p><strong>Response:</strong> {c.adminResponse || "None yet"}</p>

              {c.status === "pending" && (
                <>
                  <textarea
                    value={responses[c.id] || ""}
                    placeholder="Write response..."
                    onChange={e => handleResponseChange(c.id, e.target.value)}
                  />
                  <button onClick={() => handleSubmitResponse(c.id)}>Send Response</button>
                </>
              )}
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default AdminDashboard;
