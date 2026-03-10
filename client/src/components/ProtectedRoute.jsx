import React from "react";
import { Navigate, Outlet } from "react-router-dom";

/**
//  * @param {Array} allowedRoles - roles allowed to access this route, e.g., ["student","instructor"]
//  */


// export default ProtectedRoute;
const ProtectedRoute = ({ allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return <Navigate to="/login" />;

  // if (!allowedRoles.includes(user.role)) 
  //   return <Navigate to="/unauthorized" />;

  return <Outlet />;
};
export default ProtectedRoute;