import React, { useContext } from "react";
import { Route } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import Login from "./Login";

const PrivateRoute = ({ component: RouteComponent, ...options }: {
  [x: string]: any;
  component: any;
}) => {
  const { uid } = useContext(AuthContext);
  const Component = uid ? RouteComponent : Login;
  console.log("private")
  return <Route {...options} component={Component} />;
};

export default PrivateRoute;