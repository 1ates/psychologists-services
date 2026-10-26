import React, { useState, useEffect } from "react";
import styles from "./PsychologistCard.module.css";
import { useAuth } from "../../context/AuthContext";
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../../firebase";
import AppointmentModal from "../AppointmentModal/AppointmentModal";
import Icon from "../Icon/Icon";

const PsychologistCard = ({ psychologist, onAuthRequired, onFavoriteChange }) => {
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
        if (onFavoriteChange) onFavoriteChange(psychologist.id);
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
            <span className={styles.rating}><Icon name="star" width={16} height={16} /> Rating: {psychologist.rating}</span>
            <span>Price / 1 hour: <strong className={styles.price}>{psychologist.price_per_hour}$</strong></span>
            <button className={styles.favoriteBtn} onClick={toggleFavorite}>
              <Icon name={isFavorite ? "heart-filled" : "heart"} width={24} height={22} />
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
              <div key={index} className={styles.reviewItem}>
                <div className={styles.reviewHeader}>
                  <div className={styles.reviewerAvatar}>
                    {rev.reviewer.charAt(0)}
                  </div>
                  <div>
                    <h4 className={styles.reviewerName}>{rev.reviewer}</h4>
                    <span className={styles.reviewRating}><Icon name="star" width={14} height={14} /> {rev.rating}</span>
                  </div>
                </div>
                <p className={styles.reviewComment}>{rev.comment}</p>
              </div>
            ))}

            <div className={styles.appointmentBtnContainer}>
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
