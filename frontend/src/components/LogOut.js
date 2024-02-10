import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../App";
const LogOut = () => {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("/signout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        dispatch({ type: "USER", payload: false });
        localStorage.removeItem("jwtoken");
        navigate("/");
        window.location.reload();
        if (res.status !== 200) {
          throw new Error(res.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },[]);
  // useEffect(() => {
  //   localStorage.removeItem("jwtoken");
    
  
  //   dispatch({ type: "USER", payload: false });
  //   navigate("/");
  // },[])
  
  return <>Log out page</>;
};

export default LogOut;
