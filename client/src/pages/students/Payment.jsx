import React, { useState } from "react";
import "./RecommendedCourses.css"; 

const Payment = () => {
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardName: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = (e) => {
    e.preventDefault();
    alert("Payment processed successfully!");
  };

  const course = {
    title: "Fullstack MERN Bootcamp",
    price: "$99",
    instructor: "Alex Johnson",
    duration: "40h",
  };

  return (
    <div className="dashboard-page">
      <h1 className="page-title">Course Payment</h1>

      <div className="payment-container">
        <div className="course-summary">
          <h2>{course.title}</h2>
          <p>Instructor: <strong>{course.instructor}</strong></p>
          <p>Duration: <strong>{course.duration}</strong></p>
          <p>Price: <strong>{course.price}</strong></p>
        </div>

        <form className="payment-form" onSubmit={handlePayment}>
          <h3>Enter Payment Details</h3>
          <input
            type="text"
            name="cardName"
            placeholder="Cardholder Name"
            value={formData.cardName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            value={formData.cardNumber}
            onChange={handleChange}
            required
          />
          <div className="card-row">
            <input
              type="text"
              name="expiry"
              placeholder="MM/YY"
              value={formData.expiry}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="cvv"
              placeholder="CVV"
              value={formData.cvv}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="view-btn">
            Pay {course.price}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
