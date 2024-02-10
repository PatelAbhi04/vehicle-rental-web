// import { Button } from "bootstrap";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import SuccessBooking from "./SuccessBooking";

const VehicleDetails = () => {
  const vid = useParams();
  const [booking, setBooking] = useState({
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    bookedVehicle: "",
    vehicleOwner: "",
    bookedBy: "",
  });
  const [vehicle, setVehicle] = useState({});
  const [user, setUser] = useState({});
  const [owner, setOwner] = useState({});
  const navigate = useNavigate();

  const callUser = async () => {
    try {
      const res = await fetch("/userpage", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      // console.log(data);
      setUser(data);

      if (res.status !== 200) {
        throw new Error(res.error);
      }
    } catch (err) {
      console.log(err);
      navigate("/login");
    }
  };

  const sendBookingData = async (e) => {
    e.preventDefault();

    const startDate = booking.startDate;
    const startTime = booking.startTime;
    const endDate = booking.endDate;
    const endTime = booking.endTime;
    const bookedVehicle = vehicle._id;
    const vehicleOwner = owner._id;
    const bookedBy = user._id;

    const name = vehicle.name;
    const vehicleimg = vehicle.vehicleimg;
    const company = vehicle.company;
    const color = vehicle.color;
    const average = vehicle.average;
    const modelyear = vehicle.modelyear;
    const capacity = vehicle.capacity;
    const rentamount = vehicle.rentamount;
    const regno = vehicle.regno;

    const owner_fname = owner.fname;
    const owner_lname = owner.lname;
    const owner_userimg = owner.userimg;
    const owner_email = owner.email;
    const owner_phone = owner.phone;
    const owner_address = owner.address;
    const owner_pincode = owner.pincode;
    const owner_city = owner.city;

    const user_fname = user.fname;
    const user_lname = user.lname;
    const user_userimg = user.userimg;
    const user_email = user.email;
    const user_phone = user.phone;
    const user_address = user.address;
    const user_pincode = user.pincode;
    const user_city = user.city;

    const res = await fetch("http://localhost:5000/bookvehicle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        startDate,
        startTime,
        endDate,
        endTime,
        bookedVehicle,
        vehicleOwner,
        bookedBy,
        name,
        vehicleimg,
        company,
        color,
        average,
        modelyear,
        capacity,
        rentamount,
        regno,
        owner_fname,
        owner_lname,
        owner_userimg,
        owner_email,
        owner_phone,
        owner_address,
        owner_pincode,
        owner_city,
        user_fname,
        user_lname,
        user_userimg,
        user_email,
        user_phone,
        user_address,
        user_pincode,
        user_city,
      }),
    });

    const data = await res.json();
    console.log(data);
    if (data.status === 422 || !data) {
      window.alert("Invalid Vehicle data");
      console.log("Invalid Vehicle data");
    } else {
      // window.alert("Vehicle Booked successfully");
      console.log("Vehicle Booked successfully");
      navigate(`/vehicle/${bookedVehicle}/success`);
    }
  };

  const handleInputs = (e) => {
    // let name = e.target.name;
    // console.log(name);
    setBooking({ ...booking, [e.target.name]: e.target.value });
    // console.log(e.target.value);
  };

  //console.log(vid);

  const getVehicle = async (vid) => {
    //console.log(vid.id);
    try {
      const res = await fetch(`/vehicledetail/${vid.id}`);
      const json = await res.json();
      setVehicle(json);

      const res2 = await fetch(`http://localhost:5000/userbyid/${json.owner}`);
      const json2 = await res2.json();
      setOwner(json2);
    } catch (err) {
      console.log(err);
      navigate("/allvehicles");
    }
  };

  useEffect(() => {
    callUser();
    getVehicle(vid);
  }, []);

  return (
    <>
      {/* <div className="row">
        <div className="col-6">
          <img
            src={`http://localhost:5000/public/image/vehicleimg/${vehicle.vehicleimg}`}
            alt="vehicle_image"
          />
        </div>
        <div className="col-6">
          <div className="col-3">
            <h1>{vehicle.name}</h1>
            <h3>Company: {vehicle.company}</h3>
            <h3>Color: {vehicle.color}</h3>
            <h3>Average: {vehicle.average}km</h3>
            <h3>Model Year: {vehicle.modelyear}</h3>
            <h3>Member Capacity: {vehicle.capacity}</h3>
          </div>
          <div className="col-3">
            <h3>Owner: {vehicle.fname}</h3>
            <h3>Number Plate: {vehicle.regno}</h3>
            <h1>Rent Amount: ₹{vehicle.rentamount}/hour</h1>
            <button type="button" className="btn btn-outline-warning">
              Book Now
            </button>
          </div>
        </div>
      </div> */}
      <div className="vehicle-detail">
        <div className="container">
          <div className="card">
            <div className="container-fliud">
              <div className="wrapper row">
                <div className="preview col-md-6">
                  <div className="preview-pic tab-content">
                    <div className="tab-pane active" id="pic-1">
                      <img
                        src={vehicle.vehicleimg}
                        alt={vehicle.name}
                      />
                    </div>
                  </div>
                </div>
                <div className="details col-md-6">
                  <h3 className="vehicle-title">{vehicle.name}</h3>
                  {/* <div className="rating">
                    <div className="stars">
                      <span className="fa fa-star checked"></span>
                      <span className="fa fa-star checked"></span>
                      <span className="fa fa-star checked"></span>
                      <span className="fa fa-star"></span>
                      <span className="fa fa-star"></span>
                    </div>
                    <span className="review -no">41 reviews</span>
                  </div> */}
                  <ul className="vehicle-description">
                    <li>
                      Company: <span>{vehicle.company}</span>
                    </li>
                    <li>
                      Color: <span>{vehicle.color}</span>
                    </li>
                    <li>
                      Average: <span>{vehicle.average} km/l</span>
                    </li>
                    <li>
                      Model Year: <span>{vehicle.modelyear}</span>
                    </li>
                    <li>
                      Member Capacity: <span>{vehicle.capacity}</span>
                    </li>
                    <li>
                      Owner:{" "}
                      <span>
                        {owner.fname} {owner.lname}
                      </span>
                    </li>
                    <li>
                      Address:{" "}
                      <span>
                        {owner.address}, {owner.city}-{owner.pincode}
                      </span>
                    </li>
                    <li>
                      Number Plate: <span>{vehicle.regno}</span>
                    </li>
                  </ul>
                  <h4 className="price">
                    Rent Amount: <span>₹{vehicle.rentamount}/Hour </span>
                  </h4>

                  <div className="action">
                    {/*<button className="like btn btn-default" type="button">
                        <span className="fa fa-heart"></span>
                      </button> */}

                    <button
                      type="button"
                      className="book-now btn btn-outline-dark"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      Book Now
                    </button>

                    <div
                      className="modal fade"
                      id="exampleModal"
                      tabIndex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                              Booking Details
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
                            <form
                              onSubmit={sendBookingData}
                              method="post"
                              encType="multipart/form-data"
                            >
                              <div className="booking-form">
                                <div className="row form-group">
                                  <label className="col-4">Start Date: </label>
                                  <input
                                    type="date"
                                    min={new Date().toISOString().split("T")[0]}
                                    name="startDate"
                                    className="col-6"
                                    value={booking.startDate}
                                    onChange={handleInputs}
                                    autoComplete="off"
                                    required
                                  />
                                </div>
                                <div className="row form-group">
                                  <label className="col-4">Start Time: </label>
                                  <input
                                    type="time"
                                    name="startTime"
                                    className="col-6"
                                    value={booking.startTime}
                                    onChange={handleInputs}
                                    autoComplete="off"
                                    required
                                  />
                                </div>
                                <div className="row form-group">
                                  <label className="col-4">End Date: </label>
                                  <input
                                    type="date"
                                    min={booking.startDate}
                                    name="endDate"
                                    className="col-6"
                                    value={booking.endDate}
                                    onChange={handleInputs}
                                    autoComplete="off"
                                    required
                                  />
                                </div>
                                <div className="row form-group">
                                  <label className="col-4">End Time: </label>
                                  <input
                                    type="time"
                                    name="endTime"
                                    className="col-6"
                                    value={booking.endTime}
                                    onChange={handleInputs}
                                    autoComplete="off"
                                    required
                                  />
                                </div>
                              </div>
                              <input
                                type="submit"
                                name="confirmbooking"
                                className="book-confirm btn btn-outline-success"
                                value="Confirm Booking"
                                data-bs-dismiss="modal"
                              />
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VehicleDetails;

{
  /* <div class="container">
  <div class="row">
    <div class="col-lg-12">
      <button type="button" class="btn btn-danger btn-lg" data-toggle="modal" data-target="#deleteConfirmation">
         Delete
      </button>
      <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#addContact">
         Add New Contact
      </button>
    </div>
  </div>


<!-- Modal 1 -->
<div class="modal fade" id="deleteConfirmation" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">Delete</h4>
      </div>
      <div class="modal-body">
        <h5>Are you sure you want to delete this contact?</h5>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" id="deleteNo" data-dismiss="modal">No</button>
        <button type="button" class="btn btn-primary" id="deleteOk">Yes</button>
      </div>
    </div>
  </div>
</div>
  
<!-- Modal 2 -->
<div class="modal fade" id="addContact" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">Add New Contact</h4>
      </div>
      <div class="modal-body">
        <label>First Name </label><input /> <br />
      <label>Last Name </label><input /> <br />
      <label>Address </label><input /> <br />
      <label>Phone Number </label><input /> <br />
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary" id="addConfirm">Confirm</button>
      </div>
    </div>
  </div>
</div>
  
</div>   */
}
