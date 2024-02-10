import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import "./login.css";
import Cookies from 'universal-cookie';

function Login() {
    // const { state, dispatch } = useContext(UserContext);
  
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");
  
    const loginadmin = async (e) => {
      e.preventDefault();
      const res = await fetch("/adminlogin", {
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
        // dispatch({ type: "USER", payload: true });
        window.alert("Login successful");
        
  
        // localStorage.setItem("admintoken", JSON.stringify(data));
        history.push("/");
        window.location.reload();
      }
    };
    return (
        <>

            <div className="loginform">
                <form className="form-signin" method="post" onSubmit={loginadmin}>
                    <h1 className="h3 mb-3 font-weight-normal logintitle">Please sign in</h1>
                    {/* <label htmlFor="inputEmail" className="sr-only adminlabel">Email address</label> */}
                    <div className="admindata"><input type="email" id="inputEmail" className="form-control" placeholder="Email address" onChange={(e) => setEmail(e.target.value)} required autoFocus /></div>

                    {/* <label htmlFor="inputPassword" className="sr-only admininput admindata">Password</label> */}
                    <div className="admindata"><input type="password" id="inputPassword" className="form-control" placeholder="Password" onChange={(e) => setpassword(e.target.value)} required /></div>
                    <button className="btn btn-lg btn-primary submitbtn" type="submit">Sign in</button>
                </form>

            </div>
        </>
    )
}

export default Login