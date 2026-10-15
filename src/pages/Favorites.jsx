import React, { useEffect, useState } from "react";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import PsychologistCard from "../components/PsychologistCard/PsychologistCard";
import Loader from "../components/Loader/Loader";

const Favorites = () => {
  const { user, loading: authLoading } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

        // Fetch psychologist documents for favorite IDs
        const psychRef = collection(db, "psychologists");
        // Firestore 'in' query supports at most 30 items
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

    if (!authLoading) {
      fetchFavorites();
    }
  }, [user, authLoading]);

  if (authLoading || loading) return <Loader />;
  if (!user) return <div style={{ padding: "40px 128px" }}>Please log in to view favorites.</div>;

  return (
    <div style={{ padding: "40px 128px", backgroundColor: "#f3f3f3", minHeight: "100vh" }}>
      <h2>Favorites</h2>
      {favorites.length === 0 ? (
        <p>No favorites added yet.</p>
      ) : (
        <div>
          {favorites.map(psychologist => (
            <PsychologistCard key={psychologist.id} psychologist={psychologist} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
