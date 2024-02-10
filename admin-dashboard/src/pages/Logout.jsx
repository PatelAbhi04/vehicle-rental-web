import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { UserContext } from "../App";
const Logout = () => {
//   const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  useEffect(() => {
    fetch("/adminlogout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        // dispatch({ type: "USER", payload: false });
        // localStorage.removeItem("admintoken");
        history.push("/");
        if (res.status !== 200) {
          throw new Error(res.error);
        }
        window.location.reload();
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

export default Logout;
