// import { useEffect, useState } from "react";
// import "./Enrollment.css"
// const MyEnrollments = () => {
//   const [enrollments, setEnrollments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchEnrollments = async () => {
//       if (!token) return;

//       try {
//         const res = await fetch("http://localhost:15000/api/enrollments", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const data = await res.json();

//         if (res.ok) {
//           setEnrollments(data.enrollments || []);
//         } else {
//           console.error("Error fetching enrollments:", data.message);
//         }
//       } catch (error) {
//         console.error("Fetch error:", error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEnrollments();
//   }, [token]);

//   if (!token) {
//     return <p>Please login to view your enrolled courses.</p>;
//   }

//   if (loading) {
//     return <p>Loading your enrolled courses...</p>;
//   }

//   if (enrollments.length === 0) {
//     return <p>You have not enrolled in any courses yet.</p>;
//   }

//   return (
//     <div style={{ padding: "30px" }}>
//       <h1>🎓 My Enrolled Courses</h1>
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(3, 1fr)",
//           gap: "20px",
//           marginTop: "20px",
//         }}
//       >
//         {enrollments.map((enroll) => (
//           <div
//             key={enroll._id}
//             style={{
//               border: "1px solid #ddd",
//               borderRadius: "10px",
//               padding: "15px",
//               background: "#f9f9f9",
//             }}
//           >
//             <h3>{enroll.course?.title}</h3>
//             <p>{enroll.course?.description}</p>
//             <p style={{ fontSize: "12px", color: "gray" }}>
//               Enrolled on {new Date(enroll.createdAt).toLocaleDateString()}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MyEnrollments;
