import React, { useState } from "react";
import "../styles/Collab.css";
import { Mail, Phone, MapPin, Send, ArrowUpRight } from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:15000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Something went wrong");
        return;
      }

      alert("Message sent successfully");

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-wrapper">

      {/* Hero */}

      <section className="contact-hero">

        <div className="contact-glow contact-glow-blue"></div>
        <div className="contact-glow contact-glow-coral"></div>

        <span className="contact-eyebrow">
          <span></span>
          WE'RE HERE TO HELP
        </span>

        <h1>
          Let's{" "}
          <span>Connect</span>
        </h1>

        <p>
          Have a question about SkillArena? Our team is ready to
          help you find the right answer.
        </p>

      </section>


      {/* Contact container */}

      <section className="contact-container">

        {/* Information */}

       <div className="contact-info">

  <span className="contact-label">
    CONTACT INFORMATION
  </span>

  <h2>
    We'd love to
    <span> hear from you.</span>
  </h2>

  <p className="contact-description">
    Whether you have a question about a course, need technical
    assistance, or want to collaborate with SkillArena, our team
    is ready to help.
  </p>

  {/* Contact details */}

  <div className="contact-items">

    <div className="contact-item">
      <div className="contact-icon">
        <Mail size={19} />
      </div>

      <div>
        <span>Email</span>
        <strong>support@skillarena.com</strong>
      </div>
    </div>

    <div className="contact-item">
      <div className="contact-icon">
        <Phone size={19} />
      </div>

      <div>
        <span>Phone</span>
        <strong>+92 300 1234567</strong>
      </div>
    </div>

    <div className="contact-item">
      <div className="contact-icon">
        <MapPin size={19} />
      </div>

      <div>
        <span>Location</span>
        <strong>Lahore, Pakistan</strong>
      </div>
    </div>

  </div>


  {/* Trust block */}

  <div className="contact-trust">

    <div className="trust-avatars">
      <span>SA</span>
      <span>15K</span>
      <span>+</span>
    </div>

    <div className="trust-text">
      <strong>Join our growing community</strong>
      <p>
        Thousands of learners are already building
        their skills with SkillArena.
      </p>
    </div>

  </div>


  {/* Response status */}

  <div className="contact-note">
    <span className="contact-note-dot"></span>

    <p>
      Our support team usually responds within 24 hours
    </p>
  </div>

</div>

        {/* Form */}

        <form
          className="contact-form"
          onSubmit={handleSubmit}
        >

          <div className="form-header">

            <div>
              <span>START A CONVERSATION</span>

              <h3>
                Send us a message
              </h3>
            </div>

            <div className="form-arrow">
              <ArrowUpRight size={20} />
            </div>

          </div>


          <div className="input-group">

            <label>Your Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />

          </div>


          <div className="input-group">

            <label>Email Address</label>

            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />

          </div>


          <div className="input-group">

            <label>Message</label>

            <textarea
              rows="5"
              name="message"
              placeholder="Tell us how we can help..."
              value={formData.message}
              onChange={handleChange}
              required
            />

          </div>


          <button
            type="submit"
            className="send-btn"
            disabled={loading}
          >
            {loading ? (
              "Sending..."
            ) : (
              <>
                Send Message
                <Send size={17} />
              </>
            )}
          </button>

        </form>

      </section>

    </div>
  );
};

export default ContactPage;