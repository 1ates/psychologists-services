import React from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.heroContent}>
        <h1 className={styles.title}>
          The road to the <span className={styles.titleAccent}>depths</span> of the human soul
        </h1>
        <p className={styles.description}>
          We help you to find a professional psychologist, personal consultation, and private support from certified specialists.
        </p>
        <Link to="/psychologists" className={styles.getStartedBtn}>
          Get started ↗
        </Link>
      </div>
      <div className={styles.heroImage}>
        <span>Psychologists Image</span>
      </div>
    </div>
  );
};

export default Home;
