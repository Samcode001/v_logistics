import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ShipperprotectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const role = localStorage.getItem("role");

  return role === "shipper" ? children : <Navigate to="/" />;
};

export default ShipperprotectedRoute;
