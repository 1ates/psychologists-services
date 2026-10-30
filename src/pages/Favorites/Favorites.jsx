import { useEffect, useRef, useState } from "react";
import { get, ref } from "firebase/database";
import { db } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import PsychologistCard from "../../components/PsychologistCard/PsychologistCard";
import Loader from "../../components/Loader/Loader";
import { PAGE_SIZE } from "../../utils/psychologistQueries";
import styles from "./Favorites.module.css";

const Favorites = () => {
  const { user, loading: authLoading } = useAuth();
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [psychologists, setPsychologists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState(null);
  const requestId = useRef(0);

  const loadPsychologists = async (idsToLoad) => {
    const currentRequest = requestId.current + 1;
    requestId.current = currentRequest;
    setLoadingMore(true);

    try {
      const psychologistSnapshots = await Promise.all(
        idsToLoad.map((id) => get(ref(db, `psychologists/${id}`)))
      );
      const favoritePsychologists = psychologistSnapshots.reduce((result, snapshot, index) => {
        if (snapshot.exists()) {
          result.push({ id: idsToLoad[index], ...snapshot.val() });
        }
        return result;
      }, []);

      if (currentRequest === requestId.current) {
        setPsychologists(favoritePsychologists);
        setLoadingMore(false);
      }
    } catch {
      if (currentRequest === requestId.current) {
        setError("We could not load your favorites. Please try again.");
        setLoadingMore(false);
      }
    }
  };

  useEffect(() => {
    let isCancelled = false;

    const fetchFavorites = async () => {
      if (!user) {
        setFavoriteIds([]);
        setPsychologists([]);
        setHasMore(false);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const favoriteSnapshot = await get(ref(db, `users/${user.uid}/favorites`));
        const ids = Object.entries(favoriteSnapshot.val() || {})
          .filter(([, value]) => value === true)
          .map(([id]) => id);

        if (!isCancelled) {
          setFavoriteIds(ids);
          setHasMore(ids.length > PAGE_SIZE);
          await loadPsychologists(ids.slice(0, PAGE_SIZE));
        }
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

  const handleLoadMore = () => {
    const nextCount = psychologists.length + PAGE_SIZE;
    const nextIds = favoriteIds.slice(0, nextCount);
    loadPsychologists(nextIds);
  };

  const handleFavoriteChange = (removedId) => {
    setFavoriteIds((prevIds) => prevIds.filter((id) => id !== removedId));
    setPsychologists((prevPsychologists) =>
      prevPsychologists.filter((item) => item.id !== removedId)
    );
  };

  useEffect(() => {
    setHasMore(favoriteIds.length > psychologists.length);
  }, [favoriteIds, psychologists]);

  if (authLoading || loading) return <Loader />;
  if (!user) return <div className={styles.container}>Please log in to view favorites.</div>;

  return (
    <section className={styles.container} aria-labelledby="favorites-title" aria-busy={loading || loadingMore}>
      <h1 id="favorites-title" className={styles.title}>Favorites</h1>
      {error && <p className={styles.error} role="alert">{error}</p>}
      {psychologists.length === 0 && !error && !loadingMore ? (
        <p className={styles.emptyText}>No favorites added yet.</p>
      ) : (
        <div>
          {psychologists.map((psychologist) => (
            <PsychologistCard
              key={psychologist.id}
              psychologist={psychologist}
              onFavoriteChange={handleFavoriteChange}
            />
          ))}
        </div>
      )}
      {loadingMore && <Loader />}
      {!loading && !loadingMore && hasMore && (
        <div className={styles.loadMoreContainer}>
          <button type="button" onClick={handleLoadMore} className={styles.loadMoreBtn}>
            Load more
          </button>
        </div>
      )}
    </section>
  );
};

export default Favorites;
