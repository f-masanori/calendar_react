import React, { useContext } from "react";
import { Route } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import Login from "./Login";

const PrivateRoute = ({ component: RouteComponent, ...options }: {
  [x: string]: any;
  component: any;
}) => {
  const { uid } = useContext(AuthContext);
  let Component:any;
  if (localStorage.getItem('uid') == "") {
    console.log("未ログイン")
    Component = Login
  } else {
    console.log("ログイン済")
    Component = RouteComponent
  }

  return <Route {...options} component={Component} />;
};

export default PrivateRoute;