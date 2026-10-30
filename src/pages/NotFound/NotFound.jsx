import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

const NotFound = () => (
  <section className={styles.container} aria-labelledby="not-found-title">
    <p className={styles.code}>404</p>
    <h1 id="not-found-title">Page not found</h1>
    <p>The page you requested does not exist or has moved.</p>
    <div className={styles.actions}>
      <Link to="/" className={styles.primaryLink}>Back to home</Link>
      <Link to="/psychologists" className={styles.secondaryLink}>Browse psychologists</Link>
    </div>
  </section>
);

export default NotFound;
