import React, { useState, useEffect } from "react";
import styles from "./PsychologistCard.module.css";
import { useAuth } from "../../context/AuthContext";
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../../firebase";
import AppointmentModal from "../AppointmentModal/AppointmentModal";

const PsychologistCard = ({ psychologist, onAuthRequired }) => {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);

  useEffect(() => {
    const checkFavorite = async () => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const favorites = userDoc.data().favorites || [];
          setIsFavorite(favorites.includes(psychologist.id));
        }
      } else {
        setIsFavorite(false);
      }
    };
    checkFavorite();
  }, [user, psychologist.id]);

  const toggleFavorite = async () => {
    if (!user) {
      if (onAuthRequired) onAuthRequired("login");
      return;
    }

    try {
      const userRef = doc(db, "users", user.uid);
      if (isFavorite) {
        await updateDoc(userRef, { favorites: arrayRemove(psychologist.id) });
        setIsFavorite(false);
      } else {
        await updateDoc(userRef, { favorites: arrayUnion(psychologist.id) });
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  const handleAppointmentClick = () => {
    if (!user) {
      if (onAuthRequired) onAuthRequired("login");
      return;
    }
    setIsAppointmentOpen(true);
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
              {isFavorite ? (
                <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" fill="#54be96" />
                </svg>
              ) : (
                <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35ZM16.5 5C15.12 5 13.81 5.62 13 6.67L12 7.87L11 6.67C10.19 5.62 8.88 5 7.5 5C5.54 5 4 6.54 4 8.5C4 11.51 7.1 14.4 12 18.92C16.9 14.4 20 11.51 20 8.5C20 6.54 18.46 5 16.5 5Z" fill="#191A15" />
                </svg>
              )}
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

        {!isExpanded && (
          <button className={styles.readMoreBtn} onClick={() => setIsExpanded(true)}>
            Read more
          </button>
        )}

        {isExpanded && (
          <div className={styles.reviewsSection}>
            {psychologist.reviews && psychologist.reviews.map((rev, index) => (
              <div key={index} style={{ marginTop: "16px" }}>
                <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "8px" }}>
                  <div style={{ width: "44px", height: "44px", borderRadius: "50%", backgroundColor: "#54be96", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "bold" }}>
                    {rev.reviewer.charAt(0)}
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: "16px" }}>{rev.reviewer}</h4>
                    <span style={{ fontSize: "14px", color: "#8a8a89" }}>⭐ {rev.rating}.0</span>
                  </div>
                </div>
                <p style={{ color: "rgba(25, 26, 21, 0.5)", fontSize: "16px" }}>{rev.comment}</p>
              </div>
            ))}

            <div style={{ marginTop: "24px" }}>
              <button className={styles.appointmentBtn} onClick={handleAppointmentClick}>
                Make an appointment
              </button>
            </div>
          </div>
        )}
      </div>

      {isAppointmentOpen && (
        <AppointmentModal psychologist={psychologist} onClose={() => setIsAppointmentOpen(false)} />
      )}
    </div>
  );
};

export default PsychologistCard;
