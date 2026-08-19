import React, { useEffect, useState } from "react";
import "../styles/CertificateAchievements.css";
import {
  Award,
  Trophy,
  Star,
  Users,
  ShieldCheck,
} from "lucide-react";

const achievements = [
  {
    icon: Users,
    title: "Active Students",
    number: 15000,
    suffix: "+",
  },
  {
    icon: Award,
    title: "Certified Courses",
    number: 120,
    suffix: "+",
  },
  {
    icon: Trophy,
    title: "Top Achievements",
    number: 50,
    suffix: "+",
  },
  {
    icon: Star,
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

      {/* Background glow */}

      <div className="achievement-glow achievement-glow-blue"></div>
      <div className="achievement-glow achievement-glow-purple"></div>


      <div className="achievements-container">

        {/* Header */}

        <div className="achievements-header">

          <span className="achievements-eyebrow">
            <span></span>
            SKILLARENA BY THE NUMBERS
          </span>

          <h2>
            Learning That Creates{" "}
            <span>Real Results</span>
          </h2>

          <p>
            Join thousands of learners building practical skills,
            earning certificates, and advancing their careers.
          </p>

        </div>


        {/* Achievement Panel */}

        <div className="achievements-panel">

          <div className="achievement-panel-top">

            <div className="achievement-trust">

              <div className="trust-icon">
                <ShieldCheck size={19} />
              </div>

              <div>
                <strong>Trusted Learning Platform</strong>
                <span>Verified skills & certificates</span>
              </div>

            </div>

            <div className="achievement-line"></div>

          </div>


          <div className="achievements-grid">

            {achievements.map((a, i) => {

              const count = useCounter(a.number, 2000);

              const Icon = a.icon;

              return (
                <div
                  key={i}
                  className="achievement-card"
                >

                  <div className="achievement-icon">
                    <Icon size={24} />
                  </div>

                  <div className="achievement-number">
                    {count.toLocaleString()}
                    <span>{a.suffix}</span>
                  </div>

                  <p>{a.title}</p>

                </div>
              );

            })}

          </div>

        </div>

      </div>

    </section>
  );
};

export default CertificateAchievements;