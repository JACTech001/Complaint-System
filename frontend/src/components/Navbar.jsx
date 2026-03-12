import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, useUser } from "@clerk/clerk-react";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const { user } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <h2>Student Complaint System</h2>
        <button className={styles.menuBtn} onClick={toggleMenu}>
          ☰
        </button>
      </div>

      <div className={`${styles.right} ${menuOpen ? styles.open : ""}`}>
        <SignedOut>
          <SignInButton>
            <button className={styles.authBtn}>Sign In</button>
          </SignInButton>
          <SignUpButton>
            <button className={styles.authBtn}>Sign Up</button>
          </SignUpButton>
        </SignedOut>

        <SignedIn>
          <NavLink to="/" className={styles.link} onClick={() => setMenuOpen(false)}>Dashboard</NavLink>
          <NavLink to="/submit" className={styles.link} onClick={() => setMenuOpen(false)}>Submit Complaint</NavLink>

          {user?.publicMetadata?.role === "admin" && (
            <NavLink to="/admin" className={styles.link} onClick={() => setMenuOpen(false)}>Admin</NavLink>
          )}

          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
