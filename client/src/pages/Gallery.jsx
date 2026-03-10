import React from "react";
import "../styles/GallerySection.css";

const galleryImages = [
  {
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    title: "Live Interactive Classes",
  },
  {
    img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655",
    title: "Expert Mentors",
  },
  {
    img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    title: "Learn Anytime, Anywhere",
  },
  {
    img: "https://images.unsplash.com/photo-1509062522246-3755977927d7",
    title: "Hands-on Projects",
  },
  {
    img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    title: "Collaborative Learning",
  },
];

const GallerySection = () => {
  return (
    <section className="sa-gallery">
      <div className="gallery-container">
        <div className="gallery-header">
          <h2>
            Learning in <span className="blue-text">Action</span>
          </h2>
          <p>
            A glimpse into how learners grow, collaborate, and succeed with
            SkillArena.
          </p>
        </div>

        <div className="gallery-grid">
          {galleryImages.map((item, index) => (
            <div key={index} className="gallery-card">
              <img src={item.img} alt={item.title} />
              <div className="gallery-overlay">
                <h3>{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
