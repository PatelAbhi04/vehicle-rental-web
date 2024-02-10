import React from "react";
import { NavLink } from "react-router-dom";

function VehicleCard(props) {
  return (
    
    <>
      <div className="vehiclecard">
        <div className="card">
          <div>
            <img
              className="vehicle-image"
              src={props.v.vehicleimg}
              alt="vehicle"
            />
          </div>
          <div>
            <h5 className="vehicle-name">
              {props.v.name} - {props.v.company}
            </h5>
          </div>
          <div className="card-button">
            <h5 className="vehicle-rent">₹{props.v.rentamount}/Hour</h5>
            </div>
            <NavLink
              to={`/vehicle/${props.v._id}`}
              type="button"
              className="btn btn-outline-success viewbtn"
            >
              View Details
            </NavLink>
          
        </div>
      </div>
    </>
  );
}

export default VehicleCard;
