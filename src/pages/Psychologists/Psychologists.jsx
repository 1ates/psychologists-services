import { useEffect, useRef, useState } from "react";
import { get, limitToFirst, limitToLast, orderByChild, orderByKey, query, ref } from "firebase/database";
import { db } from "../../firebase";
import PsychologistCard from "../../components/PsychologistCard/PsychologistCard";
import Loader from "../../components/Loader/Loader";
import AuthModal from "../../components/AuthModal/AuthModal";
import { PAGE_SIZE, getDisplayRecords, getSortConfig } from "../../utils/psychologistQueries";
import styles from "./Psychologists.module.css";

const buildPsychologistsQuery = (filter, count) => {
  const config = getSortConfig(filter);
  const constraints = [config.child ? orderByChild(config.child) : orderByKey()];
  constraints.push(config.direction === "desc" ? limitToLast(count + 1) : limitToFirst(count + 1));
  return query(ref(db, "psychologists"), ...constraints);
};

const Psychologists = () => {
  const [psychologists, setPsychologists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState(null);
  const [authModalType, setAuthModalType] = useState(null);
  const requestId = useRef(0);

  const fetchPsychologists = async (filterType, count) => {
    const currentRequest = requestId.current + 1;
    requestId.current = currentRequest;
    const isInitialRequest = count === PAGE_SIZE;

    if (isInitialRequest) {
      setLoading(true);
      setPsychologists([]);
    } else {
      setLoadingMore(true);
    }
    setError(null);

    try {
      const snapshot = await get(buildPsychologistsQuery(filterType, count));
      const records = [];
      snapshot.forEach((childSnapshot) => {
        records.push({ id: childSnapshot.key, ...childSnapshot.val() });
      });

      if (currentRequest !== requestId.current) return;
      setPsychologists(getDisplayRecords(records, filterType, count));
      setHasMore(records.length > count);
    } catch {
      if (currentRequest === requestId.current) setError("We could not load psychologists. Please try again.");
    } finally {
      if (currentRequest === requestId.current) {
        setLoading(false);
        setLoadingMore(false);
      }
    }
  };

  useEffect(() => {
    fetchPsychologists(filter, PAGE_SIZE);
  }, [filter]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleLoadMore = () => {
    fetchPsychologists(filter, psychologists.length + PAGE_SIZE);
  };

  return (
    <section className={styles.container} aria-labelledby="psychologists-title" aria-busy={loading || loadingMore}>
      <div className={styles.topBar}>
        <h1 id="psychologists-title" className={styles.title}>Psychologists</h1>
        <div className={styles.filterWrapper}>
          <label htmlFor="psychologists-filter" className={styles.filterLabel}>Filters</label>
          <select
            id="psychologists-filter"
            value={filter}
            onChange={handleFilterChange}
            className={styles.filterSelect}
            disabled={loading || loadingMore}
          >
            <option value="all">Show all</option>
            <option value="az">A to Z</option>
            <option value="za">Z to A</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="popular">Popular</option>
            <option value="not-popular">Not popular</option>
          </select>
        </div>
      </div>

      {error && <p className={styles.error} role="alert">{error}</p>}
      {!loading && !error && psychologists.length === 0 && (
        <p className={styles.emptyState}>No psychologists found.</p>
      )}

      <div>
        {psychologists.map((psychologist) => (
          <PsychologistCard
            key={psychologist.id}
            psychologist={psychologist}
            onAuthRequired={(type) => setAuthModalType(type)}
          />
        ))}
      </div>

      {loading && <Loader />}
      {loadingMore && <Loader />}

      {!loading && !loadingMore && hasMore && (
        <div className={styles.loadMoreContainer}>
          <button type="button" onClick={handleLoadMore} className={styles.loadMoreBtn}>
            Load more
          </button>
        </div>
      )}

      {authModalType && (
        <AuthModal type={authModalType} onClose={() => setAuthModalType(null)} />
      )}
    </section>
  );
};

export default Psychologists;
