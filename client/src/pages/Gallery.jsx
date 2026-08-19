import React from "react";
import "../styles/GallerySection.css";

const galleryImages = [
  {
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    title: "Live Interactive Classes",
    tag: "LEARN",
  },
  {
    img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655",
    title: "Expert Mentors",
    tag: "MENTORSHIP",
  },
  {
    img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    title: "Learn Anytime, Anywhere",
    tag: "FLEXIBLE",
  },
  {
    img: "https://images.unsplash.com/photo-1509062522246-3755977927d7",
    title: "Hands-on Projects",
    tag: "PRACTICE",
  },
  {
    img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    title: "Collaborative Learning",
    tag: "COMMUNITY",
  },
];

const GallerySection = () => {
  return (
    <section className="sa-gallery">

      {/* Ambient background */}
      <div className="gallery-glow gallery-glow-blue"></div>
      <div className="gallery-glow gallery-glow-pink"></div>

      <div className="gallery-container">

        {/* Header */}
        <div className="gallery-header">

          <div className="gallery-eyebrow">
            <span></span>
            THE SKILL ARENA EXPERIENCE
          </div>

          <h2>
            Learning in{" "}
            <span className="gallery-gradient">
              Action
            </span>
          </h2>

          <p>
            See how learners connect, collaborate, practice, and build
            real-world skills throughout their learning journey.
          </p>

        </div>

        {/* Gallery */}
        <div className="gallery-grid">

          {galleryImages.map((item, index) => (
            <div
              key={index}
              className={`gallery-card gallery-card-${index + 1}`}
            >

              <img
                src={item.img}
                alt={item.title}
                loading="lazy"
              />

              <div className="gallery-shade"></div>

              <div className="gallery-content">

                <span className="gallery-tag">
                  {item.tag}
                </span>

                <h3>{item.title}</h3>

                <span className="gallery-number">
                  0{index + 1}
                </span>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default GallerySection;