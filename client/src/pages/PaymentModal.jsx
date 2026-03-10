import React, { useState } from "react";
import "../styles/PaymentModal.css";

const PaymentForm = ({ course, onClose }) => {
  const [method, setMethod] = useState("stripe");

const handlePayment = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;

    if (!token) {
      alert("Please login first");
      return;
    }

    const payload = {
      instructorId: "63f0c9c2f1b1c8a1b9d3a9e1", 
      courseId: "63f0ca00f1b1c8a1b9d3a9e2",   
      amount: course.price,
      paymentMethod: method,
    };

    console.log("Sending payload:", payload); 

    const response = await fetch("http://localhost:15000/api/paynow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Payment failed");
      return;
    }

    alert("Payment Successful!");
    onClose();
  } catch (err) {
    console.error(err);
    alert("Server error");
  }
  
};



  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Pay for {course.title}</h3>
        <p>Amount: ${course.price}</p>

        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        >
          <option value="stripe">Stripe</option>
          <option value="paypal">PayPal</option>
        </select>

        <button className="confirm-btn" onClick={handlePayment}>
          Confirm Payment
        </button>

        <button className="cancel-btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PaymentForm;
