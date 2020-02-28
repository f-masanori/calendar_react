import React, { useContext } from "react";
import { withRouter } from "react-router";
import { AuthContext } from "./auth/AuthProvider";

const Login = ({ history }) => {
  const { login,signout } = useContext(AuthContext);

  // AuthContextからlogin関数を受け取る
  const handleSubmit = event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    login(email.value, password.value, history);
  };
  const clickSignout = () => {
    console.log(55)
      signout(history)
  }
  return (
    <div>
      <h1>カレンダー</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button type="submit">Log in</button>
      </form>
      <div>
        Home
    <button onClick={() => clickSignout()}>sign out</button>
      </div>
    </div>
  );
};

export default withRouter(Login);