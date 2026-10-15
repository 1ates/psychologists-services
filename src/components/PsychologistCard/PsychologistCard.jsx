import React, { useState } from "react";
import styles from "./PsychologistCard.module.css";

const PsychologistCard = ({ psychologist }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // TODO: Handle Firebase / LocalStorage favorite sync
  };

  return (
    <div className={styles.card}>
      <div className={styles.avatarContainer}>
        <img src={psychologist.avatar_url} alt={psychologist.name} className={styles.avatar} />
        <span className={styles.onlineIndicator} />
      </div>
      <div className={styles.content}>
        <div className={styles.headerInfo}>
          <span className={styles.role}>Psychologist</span>
          <div className={styles.actions}>
            <span>⭐ Rating: {psychologist.rating}</span>
            <span>Price / 1 hour: <strong style={{ color: "#38cd3e" }}>{psychologist.price_per_hour}$</strong></span>
            <button className={styles.favoriteBtn} onClick={toggleFavorite}>
              {isFavorite ? "❤️" : "🤍"}
            </button>
          </div>
        </div>
        <h3 className={styles.name}>{psychologist.name}</h3>

        <ul className={styles.detailsList}>
          <li className={styles.detailItem}><span>Experience:</span> {psychologist.experience}</li>
          <li className={styles.detailItem}><span>License:</span> {psychologist.license}</li>
          <li className={styles.detailItem}><span>Specialization:</span> {psychologist.specialization}</li>
          <li className={styles.detailItem}><span>Initial Consultation:</span> {psychologist.initial_consultation}</li>
        </ul>

        <p className={styles.about}>{psychologist.about}</p>

        <button className={styles.readMoreBtn}>Read more</button>

        <div style={{ marginTop: "24px" }}>
          <button className={styles.appointmentBtn}>Make an appointment</button>
        </div>
      </div>
    </div>
  );
};

export default PsychologistCard;
