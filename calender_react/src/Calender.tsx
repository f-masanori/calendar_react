import React, { useContext } from "react";
import { withRouter } from "react-router";
import { AuthContext } from "./auth/AuthProvider";

const Login = (history:any ):JSX.Element => {
  const { login,signout } = useContext(AuthContext);
//   const handleSubmit = event => {
//     event.preventDefault();
//     const { email, password } = event.target.elements;
//     login(email.value, password.value, history);
//   };
  const clickSignout = () => {
    console.log("サインアウト")
      signout(history.history)
  }
  return (
    <div>
      <h1>カレンダー</h1>
      {/* <form onSubmit={handleSubmit}>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button type="submit">Log in</button>
      </form> */}
      <div>
        Home
    <button onClick={() => clickSignout()}>sign out</button>
      </div>
    </div>
  );
};

export default withRouter(Login);