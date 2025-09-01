import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
  currentUser: string | null;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, currentUser }) => {
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
