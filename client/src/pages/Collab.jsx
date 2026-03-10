import React, { useState } from "react";
import "../styles/Collab.css";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:15000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Something went wrong");
        return;
      }

      alert("Message sent successfully ");

      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      alert("Server error ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-wrapper">
      <div className="contact-hero">
        <h1>Contact<span className="red">Us</span> </h1>
        <p>We'd love to hear from you. Reach out anytime.</p>
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <h2>Get In Touch</h2>
          <p>Have questions about our courses or LMS platform? We are here to help.</p>

          <div className="contact-item">
            <Mail size={22} />
            <span>support@skillarena.com</span>
          </div>

          <div className="contact-item">
            <Phone size={22} />
            <span>+92 300 1234567</span>
          </div>

          <div className="contact-item">
            <MapPin size={22} />
            <span>Lahore, Pakistan</span>
          </div>
        </div>

        {/* Contact Form */}
        <form className="contact-form" onSubmit={handleSubmit}>
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
              placeholder="Enter your email"
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
              placeholder="Type your message..."
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="send-btn" disabled={loading}>
            {loading ? "Sending..." : <>Send Message <Send size={18} /></>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
