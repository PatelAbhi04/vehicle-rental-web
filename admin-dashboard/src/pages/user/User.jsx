import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
// import { Link } from "react-router-dom";
import "./user.css";
import React, { useState, useEffect } from 'react';
import { NavLink,useHistory } from 'react-router-dom';
import Loading from "../Loading"

export default function User() {
    const [admin, setAdmin] = useState({});
    let [loading, setLoading] = useState(true);
    const history = useHistory();
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
        setLoading(false);

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
    return (
      <>
       {loading ? <Loading /> : (
      <div className="user">
        <div className="userTitleContainer">
          <h1 className="userTitle">Profile</h1>

        </div>
        <div className="userContainer">
          <div className="userShow">
            <div className="userShowTop">
              <img
                src={`http://localhost:5000/public/image/adminimg/${admin.adminimg}`}
                alt=""
                className="userShowImg"
              />
              <div className="userShowTopTitle">
                <span className="userShowUsername">{admin.fname} {admin.lname}</span>
              </div>
            </div>
            <div className="userShowBottom">
              <div className="row">
                <div className="col-3">
                  <span className="userShowTitle">Account Details</span>
                  <div className="userShowInfo">
                    <PermIdentity className="userShowIcon" />
                    <span className="userShowInfoTitle">{admin.fname} {admin.lname}</span>
                  </div>
                  <div className="userShowInfo">
                    <CalendarToday className="userShowIcon" />
                    <span className="userShowInfoTitle">{admin.dob}</span>
                  </div>
                </div>
                <div className="col-3">
                  <span className="userShowTitle">Contact Details</span>
                  <div className="userShowInfo">  
                    <PhoneAndroid className="userShowIcon" />
                    <span className="userShowInfoTitle">{admin.phone}</span>
                  </div>
                  <div className="userShowInfo">
                    <MailOutline className="userShowIcon" />
                    <span className="userShowInfoTitle">{admin.email}</span>
                  </div>
                  <div className="userShowInfo">
                    <LocationSearching className="userShowIcon" />
                    <span className="userShowInfoTitle">{admin.address}</span>
                  </div>
                </div>
                <div>
                <NavLink to="/logout" type="button" className="logout">Log Out</NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
       )
}
      </>

  );
}