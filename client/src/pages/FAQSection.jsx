import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import "../styles/FAQSection.css";

const FAQSection = () => {
  const [faqs, setFaqs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await fetch("http://localhost:15000/api/faqs");
        const data = await res.json();
        setFaqs(data);
      } catch (error) {
        console.error("Failed to fetch FAQs", error);
      }
    };

    fetchFaqs();
  }, []);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="sa-faq">

      {/* Background decoration */}
      <div className="faq-glow faq-glow-blue"></div>
      <div className="faq-glow faq-glow-coral"></div>

      <div className="faq-container">

        {/* Header */}
        <div className="faq-header">

          <span className="faq-eyebrow">
            <span className="faq-eyebrow-dot"></span>
            NEED SOME ANSWERS?
          </span>

          <h2>
            Frequently Asked{" "}
            <span>Questions</span>
          </h2>

          <p>
            Everything you need to know about learning, courses,
            certificates, and getting started with Skill Arena.
          </p>

        </div>

        {/* FAQ */}
        <div className="faq-list">

          {faqs.map((faq, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={faq._id}
                className={`faq-item ${isActive ? "active" : ""}`}
              >

                <button
                  className="faq-question"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isActive}
                >

                  <div className="faq-question-left">

                    <span className="faq-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="faq-question-text">
                      {faq.question}
                    </span>

                  </div>

                  <span className="faq-icon">
                    <Plus size={20} strokeWidth={1.8} />
                  </span>

                </button>

                <div
                  className={`faq-answer-wrapper ${
                    isActive ? "open" : ""
                  }`}
                >
                  <div className="faq-answer">
                    {faq.answer}
                  </div>
                </div>

              </div>
            );
          })}

        </div>

        {/* Bottom message */}
        <div className="faq-footer">
          <span>Still have questions?</span>
          <a href="/contact">Talk to our team →</a>
        </div>

      </div>
    </section>
  );
};

export default FAQSection;