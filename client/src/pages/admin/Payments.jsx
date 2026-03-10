import React, { useEffect, useState } from "react";
import "./Payments.css";

const AdminPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  
    const dummyPayments = [
      {
        _id: "1",
        student: { name: "Ali Khan" },
        course: { title: "MERN Stack Mastery" },
        instructor: { name: "Ahmed Raza" },
        amount: 120,
        paymentMethod: "Stripe",
        status: "completed",
        createdAt: "2026-02-16T21:56:53.788Z",
      },
      {
        _id: "2",
        student: { name: "Sara Ahmed" },
        course: { title: "React Advanced Course" },
        instructor: { name: "Usman Tariq" },
        amount: 90,
        paymentMethod: "PayPal",
        status: "pending",
        createdAt: "2026-02-15T18:20:10.788Z",
      },
      {
        _id: "3",
        student: { name: "hira Ahmed" },
        course: { title: "React Advanced Course" },
        instructor: { name: "Usman Tariq" },
        amount: 90,
        paymentMethod: "PayPal",
        status: "pending",
        createdAt: "2026-02-15T18:20:10.788Z",
      },
      {
        _id: "4",
        student: { name: "minha Ahmed" },
        course: { title: " Advanced python Course" },
        instructor: { name: "Usman Tariq" },
        amount: 90,
        paymentMethod: "Strip",
        status: "pending",
        createdAt: "2026-02-15T18:20:10.788Z",
      },
    ];

    setPayments(dummyPayments);
    setLoading(false);
  }, []);

  if (loading) return <div className="payments-page">Loading payments...</div>;

  return (
    <div className="payments-page">
      <h2>Payments</h2>

      <table className="payments-table">
        <thead>
          <tr>
            <th>Student</th>
            <th>Course</th>
            <th>Instructor</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {payments.length > 0 ? (
            payments.map((pay) => (
              <tr key={pay._id}>
                <td>{pay.student?.name}</td>
                <td>{pay.course?.title}</td>
                <td>{pay.instructor?.name}</td>
                <td>${pay.amount}</td>
                <td>{pay.paymentMethod}</td>
                <td>
                  <span className={`status ${pay.status}`}>
                    {pay.status}
                  </span>
                </td>
                <td>
                  {new Date(pay.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No payments found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPayments;