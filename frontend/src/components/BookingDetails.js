import React, { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import { useNavigate, useParams } from "react-router-dom";

const BookingDetails = () => {
  // const uid = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  // const [vehicles, setVehicles] = useState([]);
  // const [owner, setOwner] = useState([{}]);
  const [userBooking, setUserBooking] = useState([]);
  const [star, setStar] = useState(0);
  const [writtenreview, setWrittenreview] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState({});
  // const [loading, setLoading] = useState(true);
  // const [loading2, setLoading2] = useState(true);
  // const [alldetails, setAlldetails] = useState([{}]);

  const handleRating = (star) => {
    setStar(star);
    // Some logic
  };

  const postfeedback = async (e) => {
    e.preventDefault();
    // console.log(e);
    const bookingId = selectedVehicle._id;
    const userId = userData._id;
    const userName = userData.fname + " " + userData.lname;
    const vehicleId = selectedVehicle.bookedVehicle;
    const vehicleName = selectedVehicle.name;
    const rating = star / 20;
    const review = writtenreview;

    const res = await fetch("/givefeedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bookingId,
        userId,
        userName,
        vehicleId,
        vehicleName,
        rating,
        review,
      }),
    });

    const data = await res.json();
    setStar(0);
    setWrittenreview("");
  };

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
      setUserData(data);
      // console.log(userData);

      if (res.status !== 200) {
        throw new Error(res.error);
      }
    } catch (err) {
      console.log(err);
      navigate("/login");
    }
  };

  // const getVehicle = async (vid) => {
  //   //console.log(vid.id);
  //   try {
  //     const res = await fetch(`/vehicledetail/${vid.id}`);
  //     const json = await res.json();
  //     // setVehicle(json);

  //     const res2 = await fetch(`http://localhost:5000/userbyid/${json.owner}`);
  //     const json2 = await res2.json();
  //     setOwner(json2);
  //   } catch (err) {
  //     console.log(err);
  //     navigate("/allvehicles");
  //   }
  // };

  const fetchBooking = () => {
    // console.log(userData._id);
    fetch(`/user/bookings`, {
      mode: "no-cors",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setUserBooking(data);
      });
  };

  // const fetchVehicles = () => {
  //   if (loading) {
  //     <>Loading1...</>;
  //   } else {
  //     // setLoading(true);
  //     userBooking.map(async (u) => {
  //       try {
  //         const res = await fetch(`/vehicledetail/${u.bookedVehicle}`);
  //         const data = await res.json();
  //         // console.log("work");
  //         setVehicles((content) => [...content, data]);

  //         // setAlldetails((prev) => [...prev, u, json]);
  //         // setUserBooking([(userBooking) => [...userBooking, json]]);

  //         // const res2 = await fetch(
  //         //   `http://localhost:5000/userbyid/${u.vehicleOwner}`
  //         // );
  //         // const json2 = await res2.json();
  //         // setUserBooking([...userBooking, { json2 }]);
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     });
  //     setLoading2(false);
  //   }
  // };

  useEffect(() => {
    callUser();
  }, []);

  useEffect(() => {
    fetchBooking();
  }, []);

  // useEffect(() => {
  //   fetchVehicles();
  // }, [loading]);

  // useEffect(() => {
  //   if (loading2) {
  //     console.log("call");
  //   } else {
  //     for (let i = 0; i < userBooking.length; i++) {
  //       console.log("x: " + JSON.stringify(userBooking[i]));
  //       console.log("y: " + JSON.stringify(vehicles[i]));
  //     }
  //   }
  // }, [loading2]);

  return (
    <>
      {/* {console.log(userBooking)} */}
      <div className="bookingpage">
        <div className="bookingHeader">Your Bookings</div>
        {userBooking.length === 0 ? (
          <div className="vehicleerror">
            You Haven't Booked Any Vehicle Yet...
          </div>  
        ) : (
          <form method="post" onSubmit={postfeedback}>
            {userBooking.map((ub) => {
              return (
                <>
                  <div className="bookedvehicle">
                    <div className="card">
                      {/* <div className="row"> */}
                        <div className="bookedvehicledetail">
                        <div className="bookingvehicleimgbox">
                        <img
                          className="bookingvehicleimg"
                          src={ub.vehicleimg}
                          alt="vehicle img"
                        />
                        </div>
                        <div className="bookingname">
                          {ub.name} - {ub.company}
                          <div className="bookingvehicleinfo">
                            <ul>
                              <li>
                                Average: <span>{ub.average} km/l</span>
                              </li>
                              <li>
                                Model Year: <span>{ub.modelyear}</span>
                              </li>
                              <li>
                                Reg. No.: <span>{ub.regno}</span>
                              </li>
                              <li>
                                Rent Amount: <span>₹{ub.rentamount}/Hour </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="ownerdetail">
                          Owner: {ub.owner_fname} {ub.owner_lname}
                          <div className="ownerinfo">
                            <ul>
                              <li>Mo.: {ub.owner_phone}</li>
                              <li>
                                Address: {ub.owner_address}, {ub.owner_city}-
                                {ub.owner_pincode}
                              </li>
                              <li>Email: {ub.owner_email}</li>
                            </ul>
                          </div>
                        </div>
                          <div className="bookinfo">
                            <p>Start Date: {ub.startDate.split("T")[0]}</p>
                          
                            <p>Start Time: {ub.startTime}</p>
                          
                            <p>End Date: {ub.endDate.split("T")[0]}</p>
                          <p>End Time: {ub.endTime}</p>
                           <p> Status: {ub.completed ? "Completed" : "Ongoing"}</p>
                          </div>
                        <div className="givefeedback">
                          {ub.completed ? (
                            <>
                              <button
                                type="button"
                                className="btn btn-warning feedbackbtn"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModalToggle"
                                onClick={() => setSelectedVehicle(ub)}
                              >
                                Give Feedback
                              </button>
                              <div
                                class="modal fade"
                                id="exampleModalToggle"
                                aria-hidden="true"
                                aria-labelledby="exampleModalToggleLabel"
                                tabindex="-1"
                              >
                                <div class="modal-dialog modal-dialog-centered">
                                  <div class="modal-content">
                                    <div class="modal-header">
                                      <h5
                                        class="modal-title"
                                        id="exampleModalToggleLabel"
                                      >
                                        How was your experience?
                                      </h5>
                                      <button
                                        type="button"
                                        class="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                      ></button>
                                    </div>
                                    <div class="modal-body">
                                      <div className="ratingstar">
                                      <Rating
                                        onClick={handleRating}
                                        ratingValue={star}
                                        size={40}
                                        label
                                        transition
                                        fillColor="red"
                                        emptyColor="gray"
                                        className="foo" // Will remove the inline style if applied
                                        required
                                      />
                                      </div>
                                      <div className="reviewinwords">
                                        <textarea
                                          name="review"
                                          rows="3"
                                          // cols="50"
                                          className="writtenreview"
                                          value={writtenreview}
                                          onChange={(e) =>
                                            setWrittenreview(e.target.value)
                                          }
                                          placeholder="Describe your experience in words..."
                                        />
                                      </div>
                                    </div>
                                    <div class="modal-footer">
                                      <button
                                        class="btn btn-primary"
                                        data-bs-target="#exampleModalToggle2"
                                        data-bs-toggle="modal"
                                        data-bs-dismiss="modal"
                                      >
                                        Submit Feedback
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                class="modal fade"
                                id="exampleModalToggle2"
                                aria-hidden="true"
                                aria-labelledby="exampleModalToggleLabel2"
                                tabindex="-1"
                              >
                                <div class="modal-dialog modal-dialog-centered">
                                  <div class="modal-content">
                                    <div class="modal-header modalcentre">
                                      
                                      <img
                                        src="https://img.icons8.com/cute-clipart/64/000000/pray.png"
                                        alt=""
                                      />
                                      <img
                                        src="https://img.icons8.com/cute-clipart/64/000000/pray.png"
                                        alt=""
                                      />
                                      <img
                                        src="https://img.icons8.com/cute-clipart/64/000000/pray.png"
                                        alt=""
                                      />
                                    
                                      <button
                                        type="button"
                                        class="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                      ></button>
                                    </div>
                                    <div class="modal-body">
                                      Thank you for your valuable feedback.
                                    </div>
                                    {/* <div class="modal-footer">
                                      <button
                                        class="btn btn-primary"
                                        data-bs-target="#exampleModalToggle"
                                        data-bs-toggle="modal"
                                        data-bs-dismiss="modal"
                                      >
                                        Back to first
                                      </button>
                                    </div> */}
                                  </div>
                                </div>
                              </div>
                              {/* <a
                                class="btn btn-primary"
                                data-bs-toggle="modal"
                                href="#exampleModalToggle"
                                role="button"
                              >
                                Open first modal
                              </a> */}
                              {/* 
                              <div
                                className="modal fade"
                                id="exampleModal"
                                tabIndex="-1"
                                aria-labelledby="exampleModalLabel"
                                aria-hidden="true"
                              >
                                <div className="modal-dialog">
                                  <div className="modal-content">
                                    <div className="modal-header">
                                      <h5
                                        className="modal-title"
                                        id="exampleModalLabel"
                                      >
                                        How was your experience?
                                      </h5>
                                      <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                      ></button>
                                    </div>

                                    <div className="modal-body">
                                      <Rating
                                        onClick={handleRating}
                                        ratingValue={star}
                                        size={40}
                                        label
                                        transition
                                        fillColor="red"
                                        emptyColor="gray"
                                        className="foo" // Will remove the inline style if applied
                                        required
                                      />
                                      <div>
                                        <textarea
                                          name="review"
                                          rows="3"
                                          cols="50"
                                          className="writtenreview"
                                          // value={writtenreview}
                                          onChange={() =>
                                            setWrittenreview(writtenreview)
                                          }
                                          placeholder="Describe in your experience in words..."
                                        />
                                      </div>
                                    </div>
                                    <div className="modal-footer">
                                      <button
                                        type="submit"
                                        className="btn btn-primary"
                                        data-bs-dismiss="modal"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModalToggle2"
                                      >
                                        Submit Feedback
                                      </button>
                                      <div
                                        className="modal fade"
                                        id="exampleModalToggle2"
                                        tabIndex="-1"
                                        aria-hidden="true"
                                        aria-labelledby="exampleModalToggleLabel2"
                                      >
                                        <div className="modal-dialog">
                                          <div className="modal-content">
                                            <div className="modal-header">
                                              <button
                                                type="button"
                                                className="btn-close"
                                                data-bs-dismiss="modal"
                                                aria-label="Close"
                                              ></button>
                                            </div>
                                            <div className="modal-body">
                                              <p>
                                                Thank you for your valuable
                                                feedback.
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      ;
                                    </div>
                                  </div>
                                </div>
                              </div>*/}
                            </>
                          ) : (
                            ""
                          )}
                        </div>
                        </div>
                      {/* </div> */}
                    </div>
                  </div>
                </>
              );
            })}
          </form>
        )}
      </div>
    </>
  );
};

export default BookingDetails;

// alldetails
//             // .filter((ub, i) => i % 2)
//             .map(
//               (ub) => (
//                 // ub.name ? (
//                 <div className="bookedvehicle">
//                   <div className="card">
//                     <div className="row">
//                       {/* {console.log(ub)} */}
//                       {/* ub.bookedVehicle=vehicles.id => vehicles.vehicleimg */}

//                       <img
//                         className="bookingvehicleimg"
//                         // src={vehicles
//                         //   .filter((v) => v._id === ub.bookedVehicle)
//                         //   ?.map(
//                         //     (i) =>
//                         //       `http://localhost:5000/public/image/vehicleimg/${i.vehicleimg}`
//                         //   )}
//                         src={`http://localhost:5000/public/image/vehicleimg/${ub.vehicleimg}`}
//                         alt="vehicle img"
//                       />
//                       <div className="bookingname col-3">{ub.name}</div>
//                       <div className="ownerdetail col-4">
//                         Owner: {ub.fname} {ub.lname}
//                         <div className="onhover">Mo.: {owner.phone}</div>
//                       </div>
//                       <div className="col-2">
//                         Stauts: {ub.completed ? "Complete" : "Ongoing"}
//                         {/* {console.log(ub)} */}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )
//               // ) : null
//             )
