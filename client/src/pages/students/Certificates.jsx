import React, { useEffect, useState } from "react";
import "./Certificate.css"

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const res = await fetch("http://localhost:15000/api/my-certificates", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await res.json();
        setCertificates(data);
      } catch (error) {
        console.error("Error fetching certificates:", error);
      }
    };

    fetchCertificates();
  }, []);

  return (
    <div className="certificate-section">
      <h2>My Certificates</h2>

      {certificates.length === 0 ? (
        <p>No certificates yet.</p>
      ) : (
        <div className="certificate-grid">
          {certificates.map((cert) => (
            <div key={cert._id} className="certificate-card">
              <h3>{cert.course.title}</h3>
              <p>Issued on: {new Date(cert.issuedAt).toLocaleDateString()}</p>
              <a href={cert.certificateUrl} target="_blank" rel="noreferrer">
                Download Certificate
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Certificates;
