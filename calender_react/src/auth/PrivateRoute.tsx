import React, { useContext } from "react";
import { Route } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import Login from "./Login";
import { app } from '../base';
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
    // app.auth().currentUser?.getIdToken(true).then(async (idToken: any) => {
    //   // console.log("useEffecr1")
 
    // }).catch((error: any) => {
    //   alert(error)
    // });
    Component = RouteComponent
  }

  return <Route {...options} component={Component} />;
};

export default PrivateRoute;