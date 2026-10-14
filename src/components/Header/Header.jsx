import React from "react";
import { NavLink, Link } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        <span className={styles.logoAccent}>psychologists.</span>services
      </Link>
      <nav className={styles.nav}>
        <NavLink
          to="/"
          className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ""}`}
        >
          Home
        </NavLink>
        <NavLink
          to="/psychologists"
          className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ""}`}
        >
          Psychologists
        </NavLink>
        {/* Only visible to logged in users later */}
        <NavLink
          to="/favorites"
          className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ""}`}
        >
          Favorites
        </NavLink>
      </nav>
      <div className={styles.authBlock}>
        <button className={styles.loginBtn}>Log In</button>
        <button className={styles.registerBtn}>Registration</button>
      </div>
    </header>
  );
};

export default Header;
