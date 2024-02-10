import React, { useState, useEffect } from "react";
import { NavLink,useHistory } from "react-router-dom";
import "../components/widgetLg/widgetLg.css";
import Loading from "./Loading"



const Vehicles = () => {
  // const Button = ({ type }) => {
  //     return <button className={"widgetLgButton " + type}>{type}</button>;}


  const [totalVehicles, setTotalVehicles] = useState([]);
  const [admin, setAdmin] = useState({});
  let [loading, setLoading] = useState(false);
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

  const fetchVehicles = async () => {
    const res = await fetch("/totalVehicles");
    const data = await res.json();
    setTotalVehicles(data);
  }
  useEffect(() => {
    fetchVehicles();
  }, [])


  const deleteVehicle = (id) => {
    fetch(`http://localhost:5000/vehicledelete/${id}`, {
      method: "delete"
    }).then((res) => {
      console.log(res);
    }).then((data) => {
      setLoading(true);
      setTotalVehicles(data);
      const tu = [...totalVehicles];
      setTotalVehicles(tu.filter((p) => p._id !== id));
      setLoading(false);
    })
  };
  return (
    <>
      <div className="widgetLg">
        <h3 className="widgetLgTitle">Vehicle Details</h3>
        <table className="widgetLgTable">
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Name-Company</th>
            <th className="widgetLgTh">Owner Id</th>
            <th className="widgetLgTh">Reg No</th>
            <th className="widgetLgTh">Rent Amount</th>
            <th className="widgetLgTh">Available</th>
            <th className="widgetLgTh"></th>
          </tr>
          {loading ? <Loading /> : (
            totalVehicles.map((vehicle) => {
              return (
                <>
                  <tr className="widgetLgTr">
                    <td className="widgetLgUser">
                      <img
                        src={`http://localhost:5000/public/image/vehicleimg/${vehicle.vehicleimg}`}
                        alt=""
                        className="widgetLgImg"
                      />
                      <span className="widgetLgName">{vehicle.name}-{vehicle.company}</span>
                    </td>
                    <td className="widgetLgDate">{vehicle.owner}</td>
                    <td className="widgetLgAmount">{vehicle.regno}</td>
                    <td className="widgetLgAmount">{vehicle.rentamount}</td>
                    <td className="widgetLgAmount">{vehicle.available ? "Yes" : "No"}</td>
                    <td className="widgetLgStatus">
                      <NavLink to="/vehicles">
                        <input
                          type="Submit"
                          className="Delete"
                          value="Delete"
                          onClick={()=>deleteVehicle(vehicle._id)}
                        />
                      </NavLink>
                    </td>
                  </tr>
                </>
              )
            }

            )
          )}
        </table>
      </div>
    </>
  );
};

export default Vehicles;
