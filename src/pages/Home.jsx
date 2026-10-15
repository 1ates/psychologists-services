import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "80px 128px", backgroundColor: "#fbfbfb", minHeight: "calc(100vh - 90px)" }}>
      <div style={{ maxWidth: "580px" }}>
        <h1 style={{ fontSize: "60px", lineHeight: "1.05", fontWeight: "600", color: "#191a15", marginBottom: "20px" }}>
          The road to the <span style={{ color: "#54be96" }}>depths</span> of the human soul
        </h1>
        <p style={{ fontSize: "18px", lineHeight: "1.33", color: "rgba(25, 26, 21, 0.5)", marginBottom: "40px" }}>
          We help you to find a professional psychologist, personal consultation, and private support from certified specialists.
        </p>
        <Link
          to="/psychologists"
          style={{
            backgroundColor: "#54be96",
            color: "#fff",
            textDecoration: "none",
            padding: "18px 50px",
            borderRadius: "30px",
            fontSize: "18px",
            fontWeight: "700",
            display: "inline-block"
          }}
        >
          Get started ↗
        </Link>
      </div>
      <div style={{ backgroundColor: "#54be96", width: "464px", height: "530px", borderRadius: "30px", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "24px" }}>
        {/* Illustration or Graphic placeholder */}
        <span>Psychologists Image</span>
      </div>
    </div>
  );
};

export default Home;
