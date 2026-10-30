import { useEffect, useState } from "react";
import { get, ref } from "firebase/database";
import { db } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import PsychologistCard from "../../components/PsychologistCard/PsychologistCard";
import Loader from "../../components/Loader/Loader";
import styles from "./Favorites.module.css";

const Favorites = () => {
  const { user, loading: authLoading } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    const fetchFavorites = async () => {
      if (!user) {
        setFavorites([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const favoriteSnapshot = await get(ref(db, `users/${user.uid}/favorites`));
        const favoriteIds = Object.entries(favoriteSnapshot.val() || {})
          .filter(([, value]) => value === true)
          .map(([id]) => id);

        const psychologistSnapshots = await Promise.all(
          favoriteIds.map((id) => get(ref(db, `psychologists/${id}`))),
        );
        const favoritePsychologists = psychologistSnapshots.reduce((result, snapshot, index) => {
          if (snapshot.exists()) {
            result.push({ id: favoriteIds[index], ...snapshot.val() });
          }
          return result;
        }, []);

        if (!isCancelled) setFavorites(favoritePsychologists);
      } catch {
        if (!isCancelled) setError("We could not load your favorites. Please try again.");
      } finally {
        if (!isCancelled) setLoading(false);
      }
    };

    fetchFavorites();
    return () => {
      isCancelled = true;
    };
  }, [user]);

  const handleFavoriteChange = (removedId) => {
    setFavorites((previousFavorites) => previousFavorites.filter((item) => item.id !== removedId));
  };

  if (authLoading || loading) return <Loader />;
  if (!user) return <div className={styles.container}>Please log in to view favorites.</div>;

  return (
    <section className={styles.container} aria-labelledby="favorites-title">
      <h1 id="favorites-title" className={styles.title}>Favorites</h1>
      {error && <p className={styles.error} role="alert">{error}</p>}
      {favorites.length === 0 && !error ? (
        <p className={styles.emptyText}>No favorites added yet.</p>
      ) : (
        <div>
          {favorites.map((psychologist) => (
            <PsychologistCard
              key={psychologist.id}
              psychologist={psychologist}
              onFavoriteChange={handleFavoriteChange}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Favorites;
