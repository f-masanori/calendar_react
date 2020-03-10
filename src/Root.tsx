import React, { useContext } from "react";
import { withRouter } from "react-router";
import { AuthContext } from "./auth/AuthProvider";

const Root = (history :any) => {
  const { signup } = useContext(AuthContext);


  return (
    <div>
      <h1>Home</h1>
      {/* <form onSubmit={handleSubmit}>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button type="submit">Sign Up</button>
      </form> */}
    </div>
  );
};

export default withRouter(Root);