import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { submitComplaint } from "../services/complaintService";
import styles from "./SubmitComplaint.module.css";

const SubmitComplaint = () => {
  const { user } = useUser();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) return alert("All fields are required.");

    await submitComplaint({
      title,
      description,
      studentId: user.id,
      studentName: user.fullName
    });

    alert("Complaint submitted successfully!");
    setTitle(""); 
    setDescription("");
  };

  return (
    <div className={styles.container}>
      <h2>Submit Complaint</h2>
      <p>Take note: Please submit Your matric number, name and school email adress at the end of the complaint description when submitting a complaint.</p>
      <form onSubmit={handleSubmit}>
        <input value={title} placeholder="Title" onChange={e => setTitle(e.target.value)} />
        <textarea value={description} placeholder="Description" onChange={e => setDescription(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SubmitComplaint;
