import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const location = useLocation();

  const user = localStorage.getItem("user");

  if (user) {
    // Redirect to login and preserve the current location
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}
