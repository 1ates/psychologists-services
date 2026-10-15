import React, { useEffect, useState } from "react";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import PsychologistCard from "../../components/PsychologistCard/PsychologistCard";
import Loader from "../../components/Loader/Loader";
import styles from "./Favorites.module.css";

const Favorites = () => {
  const { user, loading: authLoading } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const favoriteIds = userDoc.exists() ? userDoc.data().favorites : [];

      if (favoriteIds.length === 0) {
        setFavorites([]);
        setLoading(false);
        return;
      }

      const psychRef = collection(db, "psychologists");
      const q = query(psychRef, where("__name__", "in", favoriteIds));
      const querySnapshot = await getDocs(q);

      const favPsychs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFavorites(favPsychs);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading) {
      fetchFavorites();
    }
  }, [user, authLoading]);

  const handleFavoriteChange = (removedId) => {
    setFavorites(prev => prev.filter(item => item.id !== removedId));
  };

  if (authLoading || loading) return <Loader />;
  if (!user) return <div className={styles.container}>Please log in to view favorites.</div>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Favorites</h2>
      {favorites.length === 0 ? (
        <p className={styles.emptyText}>No favorites added yet.</p>
      ) : (
        <div>
          {favorites.map(psychologist => (
            <PsychologistCard
              key={psychologist.id}
              psychologist={psychologist}
              onFavoriteChange={handleFavoriteChange}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
