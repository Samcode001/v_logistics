import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

const TruckerprotectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const role = localStorage.getItem("role");

  return role === "trucker" ? children : <Navigate to="/" />;
};

export default TruckerprotectedRoute;
