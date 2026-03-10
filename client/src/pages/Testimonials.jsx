import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Star } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "../styles/Testimonials.css";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch("http://localhost:15000/api/testimonials");
        const data = await res.json();
        setTestimonials(data);
      } catch (err) {
        console.error("Failed to fetch testimonials", err);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <section className="testimonials-section">
      <h2>
        What Our <span className="blue-text">Students Say</span>
      </h2>

      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        slidesPerView={3}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }}
      >
        {testimonials.map((item) => (
          <SwiperSlide key={item._id}>
            <div className="testimonial-card">
              <img src={item.avatar} alt={item.name} />
              <h3>{item.name}</h3>
              <p className="role">{item.role}</p>

              <div className="rating">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="#FFD700" stroke="none" />
                ))}
              </div>

              <p className="message">“{item.message}”</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonials;
