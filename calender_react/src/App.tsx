import React from 'react';
import './App.css';
import { AuthProvider } from "./auth/AuthProvider";
import { EventProvider } from "./auth/EventProvider";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Header from "./Header";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Calender from "./Calender";
import PrivateRoute from "./auth/PrivateRoute";
import Root from "./Root";
import { Redirect, Switch } from 'react-router';
// import { IEventContext, Default } from './EventPovider'
// export const EventContext = React.createContext(Default);

function App() {
  return (
    <AuthProvider>
      <EventProvider>
      <Router>
        <Header />
        <p style={{ fontSize: `300%` }}>&nbsp;</p>
        {/* <Link to="/">Home</Link><div></div>
        <Link to="/login">login</Link><div></div>
        <Link to="/signup">signup</Link><div></div>
        <Link to="/calender">calender</Link> */}
        <div>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <PrivateRoute exact path="/calender" component={Calender} />
            <Route exact path="/" component={Root} />
            {/* <Redirect to="/" />; */}
          </Switch>
        </div>
      </Router>
      </EventProvider>
    </AuthProvider>
  );
}

export default App;
