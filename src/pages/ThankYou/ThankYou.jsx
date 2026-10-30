import { Link } from "react-router-dom";
import styles from "./ThankYou.module.css";

const ThankYou = () => (
  <section className={styles.container} aria-labelledby="thank-you-title">
    <p className={styles.icon} aria-hidden="true">✓</p>
    <h1 id="thank-you-title">Your request has been received</h1>
    <p>Thank you. We will review your appointment request and follow up with you.</p>
    <Link to="/psychologists" className={styles.link}>Continue browsing psychologists</Link>
  </section>
);

export default ThankYou;
