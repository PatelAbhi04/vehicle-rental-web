import React, { useState, useEffect } from "react";
import {useHistory} from 'react-router-dom';

import "../components/widgetLg/widgetLg.css";

const Bookings = () => {
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };

  const [totalBookings, setTotalBookings] = useState([]);
  const [admin, setAdmin] = useState({});
  const history=useHistory();

  const callAdmin = async () => {
    try {
      const res = await fetch("/adminpage", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      // console.log(data);
      setAdmin(data);

      if (res.status !== 200) {
        throw new Error(res.error);
      }
    } catch (err) {
      console.log(err);
      history.push("/login");
    }
  }

  useEffect(() => {
    callAdmin();
  }, [])

  const fetchBookings = async () => {
    const res = await fetch("/totalbookings");
    const data = await res.json();
    setTotalBookings(data);
  }

  useEffect(() => {
    fetchBookings();
  }, [])

  return (
    <>
      <div className="widgetLg">
        <h3 className="widgetLgTitle">Booking Details</h3>
        <table className="widgetLgTable">
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Booked by</th>
            <th className="widgetLgTh">Vehicle Id</th>
            <th className="widgetLgTh">Start Time</th>
            <th className="widgetLgTh">End Time</th>
            <th className="widgetLgTh">Status</th>
            <th className="widgetLgTh"></th>
          </tr>
          {totalBookings.length === 0 ? (
            <div>Your vehicle is not booked be anyone yet</div>
          ) : (
            totalBookings.map((booking) => {
              return (
                <>
                  <tr className="widgetLgTr">
                    <td className="widgetLgUser">
                      <img
                        src={`http://localhost:5000/public/image/userimg/${booking.user_userimg}`}
                        alt=""
                        className="widgetLgImg"
                      />
                      <span className="widgetLgName">{booking.user_fname}-{booking.user_lname}</span>
                    </td>
                    <td className="widgetLgAmount">{booking.bookedVehicle}</td>
                    <td className="widgetLgStatus">{booking.startDate}</td>
                    <td className="widgetLgStatus">{booking.endDate}</td>
                    <td className="widgetLgStatus">
                      {booking.completed ? "Completed" : "Ongoing"}
                    </td>
                  </tr>
                </>
              )
            }
            )
          )
          }
        </table>
      </div>
    </>
  );
};

export default Bookings;
