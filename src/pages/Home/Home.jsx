import React from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import heroImg from "../../assets/hero.png";
import Icon from "../../components/Icon/Icon";

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.heroContent}>
        <h1 className={styles.title}>
          The road to the <span className={styles.titleAccent}>depths</span> of the human soul
        </h1>
        <p className={styles.description}>
          We help you to reveal your potential, overcome challenges and find a guide in your own life with the help of our experienced psychologists.
        </p>
        <Link to="/psychologists" className={styles.getStartedBtn}>
          Get started ↗
        </Link>
      </div>
      <div className={styles.heroImageWrapper}>
        <div className={styles.heroImage}>
          <img src={heroImg} alt="Psychologists" />
        </div>

        {/* Floating Decorative Elements */}
        <div className={styles.purpleSquare}>?</div>
        <div className={styles.yellowSquare}>
          <Icon name="users" width={24} height={24} />
        </div>

        <div className={styles.experienceBadge}>
          <div className={styles.checkIconWrapper}>
            <Icon name="check" width={30} height={30} />
          </div>
          <div className={styles.badgeTextContent}>
            <span className={styles.badgeLabel}>Experienced psychologists</span>
            <span className={styles.badgeValue}>15,000</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
