import { useEffect, useState } from "react";
import styles from "./PsychologistCard.module.css";
import { useAuth } from "../../context/AuthContext";
import { get, ref, remove, set } from "firebase/database";
import { db } from "../../firebase";
import AppointmentModal from "../AppointmentModal/AppointmentModal";
import Icon from "../Icon/Icon";

const PsychologistCard = ({ psychologist, onAuthRequired, onFavoriteChange }) => {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(false);
  const [favoriteError, setFavoriteError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    const checkFavorite = async () => {
      if (!user) {
        setIsFavorite(false);
        return;
      }

      try {
        const snapshot = await get(ref(db, `users/${user.uid}/favorites/${psychologist.id}`));
        if (!isCancelled) setIsFavorite(snapshot.val() === true);
      } catch {
        if (!isCancelled) setFavoriteError("We could not load this favorite state.");
      }
    };

    checkFavorite();
    return () => {
      isCancelled = true;
    };
  }, [user, psychologist.id]);

  const toggleFavorite = async () => {
    if (!user) {
      if (onAuthRequired) onAuthRequired("login");
      return;
    }

    setFavoriteError(null);
    setIsFavoriteLoading(true);

    try {
      const favoriteRef = ref(db, `users/${user.uid}/favorites/${psychologist.id}`);
      if (isFavorite) {
        await remove(favoriteRef);
        setIsFavorite(false);
        if (onFavoriteChange) onFavoriteChange(psychologist.id);
      } else {
        await set(favoriteRef, true);
        setIsFavorite(true);
      }
    } catch {
      setFavoriteError("We could not update favorites. Please try again.");
    } finally {
      setIsFavoriteLoading(false);
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
    <article className={styles.card}>
      <div className={styles.avatarContainer}>
        <img src={psychologist.avatar_url} alt={psychologist.name} className={styles.avatar} />
        <span className={styles.onlineIndicator} aria-hidden="true" />
      </div>
      <div className={styles.content}>
        <div className={styles.headerInfo}>
          <span className={styles.role}>Psychologist</span>
          <div className={styles.actions}>
            <span className={styles.rating}><Icon name="star" width={16} height={16} /> Rating: {psychologist.rating}</span>
            <span>Price / 1 hour: <strong className={styles.price}>{psychologist.price_per_hour}$</strong></span>
            <button
              type="button"
              className={styles.favoriteBtn}
              onClick={toggleFavorite}
              disabled={isFavoriteLoading}
              aria-label={isFavorite ? `Remove ${psychologist.name} from favorites` : `Add ${psychologist.name} to favorites`}
              aria-pressed={isFavorite}
            >
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
          <button type="button" className={styles.readMoreBtn} onClick={() => setIsExpanded(true)}>
            Read more
          </button>
        )}

        {isExpanded && (
          <div className={styles.reviewsSection}>
            {psychologist.reviews?.map((review, index) => (
              <div key={`${review.reviewer}-${index}`} className={styles.reviewItem}>
                <div className={styles.reviewHeader}>
                  <div className={styles.reviewerAvatar} aria-hidden="true">
                    {review.reviewer.charAt(0)}
                  </div>
                  <div>
                    <h4 className={styles.reviewerName}>{review.reviewer}</h4>
                    <span className={styles.reviewRating}><Icon name="star" width={14} height={14} /> {review.rating}</span>
                  </div>
                </div>
                <p className={styles.reviewComment}>{review.comment}</p>
              </div>
            ))}

            <div className={styles.appointmentBtnContainer}>
              <button type="button" className={styles.appointmentBtn} onClick={handleAppointmentClick}>
                Make an appointment
              </button>
            </div>
          </div>
        )}

        {favoriteError && <p className={styles.error} role="alert">{favoriteError}</p>}
      </div>

      {isAppointmentOpen && (
        <AppointmentModal psychologist={psychologist} onClose={() => setIsAppointmentOpen(false)} />
      )}
    </article>
  );
};

export default PsychologistCard;
