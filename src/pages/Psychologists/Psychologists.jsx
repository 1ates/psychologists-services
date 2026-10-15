import React, { useEffect, useState } from "react";
import { collection, query, limit, getDocs, startAfter } from "firebase/firestore";
import { db } from "../../firebase";
import PsychologistCard from "../../components/PsychologistCard/PsychologistCard";
import Loader from "../../components/Loader/Loader";
import AuthModal from "../../components/AuthModal/AuthModal";
import styles from "./Psychologists.module.css";

const Psychologists = () => {
  const [psychologists, setPsychologists] = useState([]);
  const [filteredPsychologists, setFilteredPsychologists] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [filter, setFilter] = useState("all");
  const [authModalType, setAuthModalType] = useState(null);

  const fetchPsychologists = async (isInitial = false) => {
    setLoading(true);
    try {
      let q;
      const colRef = collection(db, "psychologists");

      if (isInitial) {
        q = query(colRef, limit(3));
      } else if (lastVisible) {
        q = query(colRef, startAfter(lastVisible), limit(3));
      } else {
        setLoading(false);
        return;
      }

      const documentSnapshots = await getDocs(q);
      const newItems = documentSnapshots.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      if (documentSnapshots.docs.length < 3) {
        setHasMore(false);
      }

      setLastVisible(documentSnapshots.docs[documentSnapshots.docs.length - 1]);
      setPsychologists(prev => {
        const updated = isInitial ? newItems : [...prev, ...newItems];
        applyFilter(updated, filter);
        return updated;
      });
    } catch (error) {
      console.error("Error fetching psychologists:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilter = (list, filterType) => {
    let result = [...list];
    switch (filterType) {
      case "az":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "za":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "price-low":
        result.sort((a, b) => a.price_per_hour - b.price_per_hour);
        break;
      case "price-high":
        result.sort((a, b) => b.price_per_hour - a.price_per_hour);
        break;
      case "popular":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "not-popular":
        result.sort((a, b) => a.rating - b.rating);
        break;
      default:
        break;
    }
    setFilteredPsychologists(result);
  };

  const handleFilterChange = (e) => {
    const val = e.target.value;
    setFilter(val);
    applyFilter(psychologists, val);
  };

  useEffect(() => {
    fetchPsychologists(true);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <h2 className={styles.title}>Psychologists</h2>
        <div className={styles.filterWrapper}>
          <label className={styles.filterLabel}>Filters</label>
          <select value={filter} onChange={handleFilterChange} className={styles.filterSelect}>
            <option value="all" style={{ color: "#000" }}>Show all</option>
            <option value="az" style={{ color: "#000" }}>A to Z</option>
            <option value="za" style={{ color: "#000" }}>Z to A</option>
            <option value="price-low" style={{ color: "#000" }}>Price: Low to High</option>
            <option value="price-high" style={{ color: "#000" }}>Price: High to Low</option>
            <option value="popular" style={{ color: "#000" }}>Popular</option>
            <option value="not-popular" style={{ color: "#000" }}>Not popular</option>
          </select>
        </div>
      </div>

      <div>
        {filteredPsychologists.map(psychologist => (
          <PsychologistCard
            key={psychologist.id}
            psychologist={psychologist}
            onAuthRequired={(type) => setAuthModalType(type)}
          />
        ))}
      </div>

      {loading && <Loader />}

      {!loading && hasMore && filter === "all" && (
        <div className={styles.loadMoreContainer}>
          <button onClick={() => fetchPsychologists(false)} className={styles.loadMoreBtn}>
            Load more
          </button>
        </div>
      )}

      {authModalType && (
        <AuthModal type={authModalType} onClose={() => setAuthModalType(null)} />
      )}
    </div>
  );
};

export default Psychologists;
