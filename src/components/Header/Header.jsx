import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import AuthModal from "../AuthModal/AuthModal";
import { useAuth } from "../../context/AuthContext";
import styles from "./Header.module.css";
import Icon from "../Icon/Icon";

const Header = () => {
  const { user, logout, theme, setTheme } = useAuth();
  const [authType, setAuthType] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setIsThemeOpen(false);
      }
    };
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setIsDropdownOpen(false);
        setIsThemeOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <>
      <header className={styles.header}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoAccent}>psychologists.</span>services
        </Link>
        <nav className={styles.nav}>
          <div className={styles.navLinkWrapper}>
            <NavLink to="/" className={styles.navLink}>Home</NavLink>
            <NavLink to="/" className={({ isActive }) => isActive ? styles.activeDot : ""} />
          </div>

          <div className={styles.navLinkWrapper}>
            <NavLink to="/psychologists" className={styles.navLink}>Psychologists</NavLink>
            <NavLink to="/psychologists" className={({ isActive }) => isActive ? styles.activeDot : ""} />
          </div>

          {user && (
            <div className={styles.navLinkWrapper}>
              <NavLink to="/favorites" className={styles.navLink}>Favorites</NavLink>
              <NavLink to="/favorites" className={({ isActive }) => isActive ? styles.activeDot : ""} />
            </div>
          )}
        </nav>

        <div className={styles.authBlock}>
          {user ? (
            <div className={styles.profileMenuContainer} ref={dropdownRef}>
              <button
                className={styles.profileBtn}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <Icon name="user" width={20} height={20} />
                <span>{user.displayName || user.email.split("@")[0]}</span>
              </button>

              {isDropdownOpen && (
                <div className={styles.dropdown}>
                  <div className={`${styles.dropdownItem} ${styles.themeWrapper}`}
                       onClick={(e) => { e.stopPropagation(); setIsThemeOpen(!isThemeOpen); }}>
                    <span>Theme</span>
                    <span>▶</span>
                    <div className={`${styles.themeSubMenu} ${isThemeOpen ? styles.themeSubMenuOpen : ""}`}>
                      <div className={styles.themeOption} onClick={(e) => { e.stopPropagation(); setTheme("green"); setIsThemeOpen(false); setIsDropdownOpen(false); }}>
                        <span className={styles.colorBadge} style={{ backgroundColor: "#54BE96" }} />
                        Green {theme === "green" && "✓"}
                      </div>
                      <div className={styles.themeOption} onClick={(e) => { e.stopPropagation(); setTheme("blue"); setIsThemeOpen(false); setIsDropdownOpen(false); }}>
                        <span className={styles.colorBadge} style={{ backgroundColor: "#3470FF" }} />
                        Blue {theme === "blue" && "✓"}
                      </div>
                      <div className={styles.themeOption} onClick={(e) => { e.stopPropagation(); setTheme("orange"); setIsThemeOpen(false); setIsDropdownOpen(false); }}>
                        <span className={styles.colorBadge} style={{ backgroundColor: "#FC832C" }} />
                        Orange {theme === "orange" && "✓"}
                      </div>
                    </div>
                  </div>
                  <div className={styles.dropdownItem} onClick={() => { logout(); setIsDropdownOpen(false); }}>
                    Log Out
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <button className={styles.loginBtn} onClick={() => setAuthType("login")}>Log In</button>
              <button className={styles.registerBtn} onClick={() => setAuthType("register")}>Registration</button>
            </>
          )}
        </div>
      </header>

      {authType && (
        <AuthModal type={authType} onClose={() => setAuthType(null)} />
      )}
    </>
  );
};

export default Header;
