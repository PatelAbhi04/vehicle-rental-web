import React from "react";
import { NavLink } from "react-router-dom";

const SuccessBooking = () => {
  return (
    <>
      <div className="container successbooking">
        <div className="successheading">Congratulations</div>
        <div className="successcontent">
          <p>You can contact the vehicle Owner for more details.</p>
          <p>Go to Booking Details to find Owner details.</p>
        </div>
        <NavLink
          to={"/user/bookingdetails"}
          type="button"
          className="btn btn-warning successbutton"
        >
          Booking Details
        </NavLink>
      </div>
    </>
  );
};

export default SuccessBooking;
