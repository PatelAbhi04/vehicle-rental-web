import React,{useState,useEffect} from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import {NavLink,useHistory,Link} from 'react-router-dom';

export default function Topbar() {
  const [admin, setAdmin] = useState({});
    // let [loading, setLoading] = useState(true);
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
        // setLoading(false);

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

    const handleOnError =(e) => {
      e.target.src="http://localhost:5000/public/image/guest.jpg"
    }
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Admin Console</span>
        </div>
        <div className="topRight">
          {/* <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div> */}
          <a href = "/profile">
          <img src={`http://localhost:5000/public/image/adminimg/${admin.adminimg}`} onError={handleOnError} alt="" className="topAvatar" />
          </a>
        </div>
      </div>
    </div>
  );
}
