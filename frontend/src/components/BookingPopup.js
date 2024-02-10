import React from "react";
import { NavLink } from "react-router-dom";

const BookingPopup = (props) => {
  const sendBookingData = () => {};
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>
          x
        </span>
        <form method="post" onSubmit={sendBookingData}>
          <div className="row">
            <label className="col-6 ">Start Date: </label>
            <input type="date" className="col-6" required />
          </div>
          <div className="row">
            <label className="col-6">Start Time: </label>
            <input type="time" className="col-6" required />
          </div>
          <div className="row">
            <label className="col-6">End Date: </label>
            <input type="date" className="col-6" required />
          </div>
          <div className="row">
            <label className="col-6">End Time: </label>
            <input type="time" className="col-6" required />
          </div>
          <NavLink
            to={""}
            type="button"
            className="book-now btn btn-outline-dark"
          >
            Confirm Booking
          </NavLink>
        </form>
      </div>
    </div>
  );
};

export default BookingPopup;
