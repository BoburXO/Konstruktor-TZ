import { Navigate } from "react-router-dom";

export const ProtectedAuthorRoute = ({ children }) => {
  if (localStorage.getItem("roleName")) {
    if (localStorage.getItem("roleName") === "Author") {
      return <>{children}</>;
    } else {
      return <Navigate to="*" />;
    }
  } else {
    return <Navigate to="/" />;
  }
};
