import React from "react";
import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const PrivateRoute = ({ role, Component }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/" />;
  try {
    const decoded = jwtDecode(token);
    if (decoded.role === role || decoded.role === "admin") {
      return <Component />;
    }
    return <h3 style={{ color: "red" }}>Access Denied</h3>;
  } catch {
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
