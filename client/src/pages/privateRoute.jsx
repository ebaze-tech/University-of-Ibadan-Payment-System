import React, { useContext } from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./authContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { auth } = useContext(AuthContext);

  if(!auth.isAuthenticated){
    return <Navigate to="/login"/>;
  }

  return <Outlet/>
}

export default PrivateRoute;