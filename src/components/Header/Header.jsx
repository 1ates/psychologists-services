import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthModal from "../AuthModal/AuthModal";
import { useAuth } from "../../context/AuthContext";
import styles from "./Header.module.css";
import Icon from "../Icon/Icon";

const Header = () => {
  const { user, logout, theme, setTheme } = useAuth();
  const [authType, setAuthType] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setIsThemeOpen(false);
      }
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
        setIsThemeOpen(false);
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const closeMenus = () => {
    setIsThemeOpen(false);
    setIsDropdownOpen(false);
    setIsMenuOpen(false);
  };

  const handleThemeChange = (nextTheme) => {
    setTheme(nextTheme);
    closeMenus();
  };

  const renderUserMenu = () => (
    <div className={styles.profileMenuContainer} ref={dropdownRef}>
      <button
        type="button"
        className={styles.profileBtn}
        onClick={() => setIsDropdownOpen((isOpen) => !isOpen)}
        aria-expanded={isDropdownOpen}
        aria-controls="profile-menu"
      >
        <Icon name="user" width={20} height={20} />
        <span>{user.displayName || user.email?.split("@")[0]}</span>
      </button>

      {isDropdownOpen && (
        <div id="profile-menu" className={styles.dropdown} role="menu">
          <div className={styles.themeWrapper}>
            <button
              type="button"
              className={styles.dropdownItem}
              onClick={() => setIsThemeOpen((isOpen) => !isOpen)}
              aria-expanded={isThemeOpen}
              aria-haspopup="menu"
              role="menuitem"
            >
              <span>Theme</span>
              <span aria-hidden="true">▶</span>
            </button>
            {isThemeOpen && (
              <div className={`${styles.themeSubMenu} ${styles.themeSubMenuOpen}`} role="menu" aria-label="Theme options">
                <button type="button" className={styles.themeOption} onClick={() => handleThemeChange("green")} role="menuitem">
                  <span className={styles.colorBadge} style={{ backgroundColor: "#54BE96" }} aria-hidden="true" />
                  Green {theme === "green" && <span aria-hidden="true">✓</span>}
                </button>
                <button type="button" className={styles.themeOption} onClick={() => handleThemeChange("blue")} role="menuitem">
                  <span className={styles.colorBadge} style={{ backgroundColor: "#3470FF" }} aria-hidden="true" />
                  Blue {theme === "blue" && <span aria-hidden="true">✓</span>}
                </button>
                <button type="button" className={styles.themeOption} onClick={() => handleThemeChange("orange")} role="menuitem">
                  <span className={styles.colorBadge} style={{ backgroundColor: "#FC832C" }} aria-hidden="true" />
                  Orange {theme === "orange" && <span aria-hidden="true">✓</span>}
                </button>
              </div>
            )}
          </div>
          <button type="button" className={styles.dropdownItem} onClick={() => { logout(); closeMenus(); }} role="menuitem">
            Log Out
          </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      <header className={styles.header}>
        <Link to="/" className={styles.logo} aria-label="Psychologists Services home">
          <span className={styles.logoAccent}>psychologists.</span>services
        </Link>

        {user ? (
          <div className={styles.headerRight}>
            <button
              type="button"
              className={styles.hamburgerBtn}
              onClick={() => {
                setIsDropdownOpen(false);
                setIsThemeOpen(false);
                setIsMenuOpen((isOpen) => !isOpen);
              }}
              aria-expanded={isMenuOpen}
              aria-label="Menü"
            >
              <span aria-hidden="true">☰</span>
            </button>
            <div className={styles.userMenu}>
              {renderUserMenu()}
            </div>
          </div>
        ) : (
          <button
            type="button"
            className={`${styles.hamburgerBtn} ${styles.hamburgerRight}`}
            onClick={() => {
              setIsDropdownOpen(false);
              setIsThemeOpen(false);
              setIsMenuOpen((isOpen) => !isOpen);
            }}
            aria-expanded={isMenuOpen}
            aria-label="Menü"
          >
            <span aria-hidden="true">☰</span>
          </button>
        )}

        <nav ref={navRef} className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ""}`} aria-label="Primary navigation">
          {!user && (
            <div className={styles.mobileAuth}>
              <button type="button" className={styles.loginBtn} onClick={() => { setAuthType("login"); setIsMenuOpen(false); }}>Log In</button>
              <button type="button" className={styles.registerBtn} onClick={() => { setAuthType("register"); setIsMenuOpen(false); }}>Registration</button>
            </div>
          )}

          <NavLink to="/" end onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}>
            Home
          </NavLink>
          <NavLink to="/psychologists" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}>
            Psychologists
          </NavLink>
          {user && (
            <NavLink to="/favorites" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}>
              Favorites
            </NavLink>
          )}
          <NavLink to="/privacy-policy" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}>
            Gizlilik Politikası
          </NavLink>
        </nav>

        {!user && (
          <div className={styles.authBlock}>
            <button type="button" className={styles.loginBtn} onClick={() => setAuthType("login")}>Log In</button>
            <button type="button" className={styles.registerBtn} onClick={() => setAuthType("register")}>Registration</button>
          </div>
        )}
      </header>

      {authType && (
        <AuthModal type={authType} onClose={() => setAuthType(null)} />
      )}
    </>
  );
};

export default Header;
