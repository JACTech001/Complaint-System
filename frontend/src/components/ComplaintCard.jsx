import React from "react";
import styles from "./ComplaintCard.module.css";

const ComplaintCard = ({ complaint }) => {
  return (
    <div className={styles.card}>
      <h4>{complaint.title}</h4>

      <p>
        <strong>Status:</strong> {complaint.status}
      </p>

      <p>
        <strong>Description:</strong> {complaint.description}
      </p>

      <p>
        <strong>Admin Response:</strong>{" "}
        {complaint.adminResponse || "No response yet"}
      </p>
    </div>
  );
};

export default ComplaintCard;
