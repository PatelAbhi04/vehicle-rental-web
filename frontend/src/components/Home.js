import React from "react";
import { NavLink } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="homepage">
        <div className="home-div">
          <h1 className="greet">Welcome!</h1>
          <p className="homeinfo">We provide Vehicle booking service. This is user to user system where we provide commision free service.</p>
          <p className="homeinfo">You can take vehicle on rent or if you have extra vehicle, you can put it on rent for earning some money.</p>
          <NavLink
            to="/addvehicle"
            type="button"
            className="Add-button"
          >
            Add a Vehicle
          </NavLink>
          <NavLink
            to="/allvehicles"
            type="button"
            className="Book-button"
          >
            Book a Vehicle
          </NavLink>
       
        </div>
      </div>
      <div className="d-flex flex-column h-100">
      <footer className="footer mt-auto py-3">
  <div className="container">
    © Abhi Patel && Dev Patel
  </div>
</footer>
</div>
    </>
  );
}

export default Home;
