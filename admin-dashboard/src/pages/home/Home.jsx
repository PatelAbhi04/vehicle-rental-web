import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import Sidebar from "../../components/sidebar/Sidebar"
import "./home.css";
import { userData } from "../../dummyData";
// import WidgetSm from "../../components/widgetSm/WidgetSm";
// import WidgetLg from "../../components/widgetLg/WidgetLg";
import Loading from "../Loading";

function Home() {
  const history = useHistory();
  const [totalUsers, setTotalUsers] = useState([]);
  const [totalVehicles, setTotalVehicles] = useState([]);
  const [totalBookings, setTotalBookings] = useState([]);
  const [admin, setAdmin] = useState({});
  let [loading, setLoading] = useState("true");

  const fetchUsers = async () => {
    const res = await fetch("/totalusers");
    const data = await res.json();
    setTotalUsers(data);
  }

  const fetchVehicles = async () => {
    const res2 = await fetch("/totalvehicles");
    const data2 = await res2.json();
    setTotalVehicles(data2);
  }

  const fetchBookings = async () => {
    const res3 = await fetch("/totalbookings");
    const data3 = await res3.json();
    setTotalBookings(data3);
    setLoading("false");
    console.log("loading...");
  }

  const callAdmin = async () => {
    try {
      const res = await fetch("/adminpage", {
        mode: "no-cors",
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      console.log(res);
      
      const data = await res.json();
      console.log(data);
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
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [])

  useEffect(() => {
    fetchVehicles();
  }, [])

  useEffect(() => {
    fetchBookings();
  }, [])

  return (
    <>
    {loading === "true" ? <Loading /> : (
      <div className="home">
        {console.log(totalUsers)}
        <FeaturedInfo users={totalUsers.length} vehicles={totalVehicles.length} bookings={totalBookings.length} />
        <div className="homeWidgets">
          {/* <WidgetSm/>
        <WidgetLg/> */}
        </div>
      </div>
    )
      }
      
    
    </>
  );
}

export default Home;