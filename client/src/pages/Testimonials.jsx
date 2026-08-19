import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Star, Quote } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "../styles/Testimonials.css";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch(
          "http://localhost:15000/api/testimonials"
        );

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

      <div className="testimonials-glow testimonials-glow-blue"></div>
      <div className="testimonials-glow testimonials-glow-purple"></div>

      <div className="testimonials-header">

        <span className="testimonials-eyebrow">
          <span></span>
          LEARNER EXPERIENCES
        </span>

        <h2>
          What Our{" "}
          <span>Students Say</span>
        </h2>

        <p>
          Real experiences from learners building their skills
          and careers with SkillArena.
        </p>

      </div>


      <div className="testimonials-slider">

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={3}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 16,
            },

            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },

            768: {
              slidesPerView: 2,
              spaceBetween: 22,
            },

            1100: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }}
        >

          {testimonials.map((item) => (

            <SwiperSlide key={item._id}>

              <div className="testimonial-card">

                <div className="testimonial-top">

                  <div className="student-info">

                    <img
                      src={item.avatar}
                      alt={item.name}
                    />

                    <div>
                      <h3>{item.name}</h3>
                      <p>{item.role}</p>
                    </div>

                  </div>

                  <div className="quote-icon">
                    <Quote size={18} />
                  </div>

                </div>


                <div className="rating">

                  {[...Array(item.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={15}
                      fill="#FFD166"
                      stroke="#FFD166"
                    />
                  ))}

                </div>


                <p className="message">
                  “{item.message}”
                </p>


                <div className="testimonial-line"></div>

                <span className="verified-review">
                  Verified learner
                </span>

              </div>

            </SwiperSlide>

          ))}

        </Swiper>

      </div>

    </section>
  );
};

export default Testimonials;