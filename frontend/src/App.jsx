import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn, useUser } from "@clerk/clerk-react";

import Navbar from "./components/Navbar";
import StudentDashboard from "./pages/StudentDashboard";
import SubmitComplaint from "./pages/SubmitComplaint";
import AdminDashboard from "./pages/AdminDashboard";
import Footer from "./components/Footer";

function App() {
  const { user, isLoaded } = useUser();

  // Wait until Clerk finishes loading user metadata
  if (!isLoaded) return <p>Loading...</p>;

  return (
    <>
      <Navbar />

      <Routes>
        {/* STUDENT DASHBOARD - signed-in users only */}
        <Route
          path="/"
          element={
            <SignedIn>
              <StudentDashboard />
            </SignedIn>
          }
        />

        {/* SUBMIT COMPLAINT PAGE */}
        <Route
          path="/submit"
          element={
            <SignedIn>
              <SubmitComplaint />
            </SignedIn>
          }
        />

        {/* ADMIN DASHBOARD - protected */}
        <Route
          path="/admin"
          element={
            <SignedIn>
              {user?.publicMetadata?.role === "admin" ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/" replace />
              )}
            </SignedIn>
          }
        />

        {/* Redirect all others to sign-in */}
        <Route
          path="*"
          element={
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
