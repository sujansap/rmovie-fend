import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/Auth.context";
import { useEffect } from "react";
export default function PrivateRoute() {
  const { ready, isAuthed, checkTokenExpiration, logout } = useAuth();
  const { pathname } = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("your_jwt_token_key");

    if (!checkTokenExpiration(token)) {
      // Token has expired, perform logout actions
      console.log("Token has expired. Logging out...");
      logout();
      // Add your logout logic here
    }
  }, []); // This effect will run once when the component mounts

  const loginPath = `/login?redirect=${pathname}`;

  if (!ready) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>Loading...</h1>
            <p>
              Please wait while we are checking your credentials and loading the
              application.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isAuthed) {
    return <Outlet />;
  }

  return <Navigate replace to={loginPath} />;
}
