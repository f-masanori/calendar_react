import React from 'react';
import logo from './logo.svg';
import './App.css';
import { AuthProvider } from "./auth/AuthProvider";
import { BrowserRouter as Router, Route ,Link} from "react-router-dom";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Calender from "./Calender";
import PrivateRoute from "./auth/PrivateRoute";
import Root from "./Root.jsx";
import { Redirect, Switch } from 'react-router';
function App() {
  return (
    <AuthProvider>
      <Router>
        <Link to="/">Home</Link>
        <Link to="/login">login</Link>
        <Link to="/calender">calender</Link>
        <div>
          <Switch>
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/calender" component={Calender} />
            <Route exact path="/" component={Root} />
            {/* <Redirect to="/" />; */}
          </Switch>
          {/* <Route exact path="/signup" component={Signup} /> */}
        </div>
      </Router>
    </AuthProvider>
    /* <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      </div> */
  );
}

export default App;
