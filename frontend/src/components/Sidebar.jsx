import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

const Sidebar = ({ isOpen, toggle, links }) => {
  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      <button className={styles.closeBtn} onClick={toggle}>×</button>
      <ul>
        {links.map(link => (
          <li key={link.to}>
            <NavLink to={link.to} onClick={toggle}>
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
