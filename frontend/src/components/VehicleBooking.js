import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";

function VehicleBooking() {
  const vid = useParams();
  //   console.log(vid.id);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [vehicleBooking, setVehicleBooking] = useState([]);
  const [feedback, setFeedback] = useState([]);
  let [loading, setLoading] = useState(true);

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

  const fetchVehicleBooking = async () => {
    const res = await fetch(`/vehiclebookinginfo/${vid.id}`);
    const data = await res.json();
    setVehicleBooking(data);
  };

  // const fetchFeedback = () => {
  //   setLoading(true);
  //   vehicleBooking.map(async (booking) => {
  //     const res2 = await fetch(
  //       `http://localhost:5000/fetchreview/${booking._id}`
  //     );
  //     const data2 = await res2.json;
  //     setFeedback(...feedback, data2);
  //   });
  //   setLoading(false);
  // };

  useEffect(() => {
    callUser();
  }, []);

  useEffect(() => {
    fetchVehicleBooking();
  }, []);

  // useEffect(() => {
  //   fetchFeedback();
  // }, [vehicleBooking]);
  return (
    <>
      {vehicleBooking.length === 0 ? (
        <div className="vehicleerror">Your vehicle is not booked by anyone yet</div>
      ) : (
        vehicleBooking.map((vb) => {
          return (
            <div className="vehiclebook">
            <div className="container">
            <div className="card">
              <div className="useralldetails">
              
                  <div className="userimgbox">
                  <img
                    className="vehicleuserimg"
                    src={vb.user_userimg}
                    alt="userimg"
                  />
                  </div>
                  <div className="userdetail">
                    Booked By: {vb.user_fname} {vb.user_lname}
                    <div className="userinfo">
                      <ul>
                        <li>Mo.: {vb.user_phone}</li>
                        <li>
                          Address: {vb.user_address}, {vb.user_city}-
                          {vb.user_pincode}
                        </li>
                        <li>Email: {vb.user_email}</li>
                      </ul>
                    </div>
                  </div>
                  <div>
                    <div className="vehiclebookinfo">
                      <p>Start Date: {vb.startDate.split("T")[0]} | Start Time: {vb.startTime}</p>
                      <p>End Date: {vb.endDate.split("T")[0]} | End Time: {vb.endTime}</p>
                      <p className="bookingstatus">Status: {vb.completed ? "Completed" : "Ongoing"}</p>
                    </div>
                  </div>
                  {/* <div className="col-2">
                    {loading2 ? (
                      <p>Loading2...</p>
                    ) : (
                      feedback
                        .filter((fb) => fb.bookingId === vb._id)
                        .map((fb) => {
                          <>
                            <p>Rating: {fb.rating}</p>
                            <p>Review: {fb.review}</p>
                          </>;
                        })
                    )}
                  </div> */}
                </div>
              </div>
             </div>
              </div>
          );
        })
      )}
    </>
  );
}

export default VehicleBooking;
