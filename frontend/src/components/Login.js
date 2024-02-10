import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { UserContext } from "../App";

function Login() {
  const { state, dispatch } = useContext(UserContext);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();
    const res = await fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();
    console.log(data);
    if (res.status === 400 || !data) {
      window.alert("Invalid credentials");
    } else {
      dispatch({ type: "USER", payload: true });
      // window.alert("Login successful");

      localStorage.setItem("jwtoken", JSON.stringify(data));
      navigate("/");
    }
  };

  return (
    <>
      <section id="login">
        <div className="container">
          <div className="login-content">
            <div className="signin-form">
              <h2 className="form-title">Login</h2>
              <form className="login-form" method="post">
                <div className="form-group">
                  <label htmlFor="email">
                    <i className="fa fa-envelope"></i>
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-field"
                    autoComplete="off"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your Email Id"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">
                    <i className="fa fa-lock"></i>
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="form-field"
                    autoComplete="off"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    placeholder="Password"
                  />
                </div>

                <div className="form-button">
                  <input
                    type="submit"
                    name="login"
                    className="form-submit"
                    value="Login"
                    onClick={loginUser}
                  />
                </div>
              </form>
              <a href="/register">Don't have an account?</a>
            </div>
          </div>
        </div>
      </section>
      ;
    </>
  );
}

export default Login;
