import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import AuthModal from "../AuthModal/AuthModal";
import styles from "./Header.module.css";

const Header = () => {
  const [authType, setAuthType] = useState(null); // 'login' | 'register' | null

  return (
    <>
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
          <NavLink
            to="/favorites"
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ""}`}
          >
            Favorites
          </NavLink>
        </nav>
        <div className={styles.authBlock}>
          <button className={styles.loginBtn} onClick={() => setAuthType("login")}>Log In</button>
          <button className={styles.registerBtn} onClick={() => setAuthType("register")}>Registration</button>
        </div>
      </header>

      {authType && (
        <AuthModal type={authType} onClose={() => setAuthType(null)} />
      )}
    </>
  );
};

export default Header;
