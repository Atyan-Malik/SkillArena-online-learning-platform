import React, { useEffect, useState } from "react";
import "../styles/CertificateAchievements.css";
import { Award, Trophy, Star, Users } from "lucide-react";

const achievements = [
  {
    icon: <Users size={28} />,
    title: "Students",
    number: 15000,
    suffix: "+",
  },
  {
    icon: <Award size={28} />,
    title: "Certified Courses",
    number: 120,
    suffix: "+",
  },
  {
    icon: <Trophy size={28} />,
    title: "Top Achievements",
    number: 50,
    suffix: "+",
  },
  {
    icon: <Star size={28} />,
    title: "Verified Skills",
    number: 100,
    suffix: "%",
  },
];

const useCounter = (end, duration = 2000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 50); 
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(Math.floor(start));
    }, 50);

    return () => clearInterval(timer);
  }, [end, duration]);

  return count;
};

const CertificateAchievements = () => {
  return (
    <section className="sa-achievements">
      <div className="achievements-container">
        <div className="achievements-header">
          <h2>Our <span className="blue-text">Certificates & Achievements</span></h2>
          <p>SkillArena empowers learners with verified skills and global recognition.</p>
        </div>

        <div className="achievements-grid">
          {achievements.map((a, i) => {
            const count = useCounter(a.number, 2000); 
            return (
              <div key={i} className="achievement-card">
                <div className="achievement-icon">{a.icon}</div>
                <h3>
                  {count.toLocaleString()}
                  {a.suffix}
                </h3>
                <p>{a.title}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CertificateAchievements;
