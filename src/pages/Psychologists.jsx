import React, { useEffect, useState } from "react";
import { collection, query, limit, getDocs, startAfter } from "firebase/firestore";
import { db } from "../firebase";
import PsychologistCard from "../components/PsychologistCard/PsychologistCard";
import Loader from "../components/Loader/Loader";

const Psychologists = () => {
  const [psychologists, setPsychologists] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

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
      setPsychologists(prev => isInitial ? newItems : [...prev, ...newItems]);
    } catch (error) {
      console.error("Error fetching psychologists:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPsychologists(true);
  }, []);

  return (
    <div style={{ padding: "40px 128px", backgroundColor: "#f3f3f3", minHeight: "100vh" }}>
      <h2 style={{ marginBottom: "32px" }}>Psychologists</h2>
      <div>
        {psychologists.map(psychologist => (
          <PsychologistCard key={psychologist.id} psychologist={psychologist} />
        ))}
      </div>

      {loading && <Loader />}

      {!loading && hasMore && (
        <div style={{ textAlign: "center", marginTop: "32px" }}>
          <button
            onClick={() => fetchPsychologists(false)}
            style={{
              backgroundColor: "#54be96",
              color: "#fff",
              border: "none",
              padding: "14px 48px",
              borderRadius: "30px",
              fontSize: "16px",
              fontWeight: "700",
              cursor: "pointer"
            }}
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
};

export default Psychologists;
