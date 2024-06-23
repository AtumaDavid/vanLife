import { Outlet, Navigate, useLocation } from "react-router-dom";

export default function AuthRequired() {
  // const authenticated = true;
  const isLoggedIn = localStorage.getItem("loggedin");
  const location = useLocation();
  console.log(location);
  // location.pathname gives us an idea of where the user was  trying to go to before being redireced to the login page

  // if (!authenticated) {
  //   return <Navigate to="/login" state={{ message: "you must login first" }} />;
  // }

  if (!isLoggedIn) {
    return (
      <Navigate
        to="/login"
        state={{ message: "You must log in first", from: location.pathname }}
        replace
      />
    );
  }
  return <Outlet />;
}
