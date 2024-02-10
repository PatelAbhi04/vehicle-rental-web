import React, { useEffect, useState } from "react";
import VehicleCard from "./VehicleCard";
import { useNavigate } from "react-router-dom";

function AllVehicles() {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [checked, setChecked] = useState({ 2: false, 4: false });
  const [cityfilter, setCityfilter] = useState("");
  const [userData, setUserData] = useState({});
  // const [booking, setBooking] = useState([]);

  // const [owner, setOwner] = useState([]);
  //const [vehicleimgpath, setVehicleimgpath] = useState("");
  const getAllVehicle = async () => {
    try {
      const res = await fetch("/allvehicle");
      const data = await res.json();
      setVehicles(data);
    } catch (e) {
      console.log(e);
    }
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

      if (res.status !== 200) {
        throw new Error(res.error);
      }
    } catch (err) {
      console.log(err);
      navigate("/login");
    }
  };
  // const getBookingData = async () => {
  //   try {
  //     const res = await fetch("http://localhost:5000/getbookingdetails");
  //     // console.log(res);
  //     const data = await res.json();
  //     // console.log(data);
  //     setBooking(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  useEffect(() => {
    // getBookingData();
    callUser();
    getAllVehicle();
  }, []);

  const handleRadioInputs = async (e) => {
    //console.log(e.target.value);
    try {
      const res = await fetch(
        `http://localhost:5000/allvehicle?wheels=${e.target.value}`
      );
      const data = await res.json();
      console.log(data);
      setVehicles(data);

      navigate(`?wheels=${e.target.value}`);
    } catch (err) {
      console.log(err);
    }
  };
  const handledropInputs = async (e) => {
    try {
      const res = await fetch(
        `http://localhost:5000/allvehicle?company=${e.target.value}`
      );
      const data = await res.json();
      setVehicles(data);

      navigate(`?company=${e.target.value}`);
    } catch (err) {
      console.log(err);
    }
  };
  const handlecity = async (e) => {
    try {
      const res = await fetch(
        `http://localhost:5000/allvehicle?city=${e.target.city}`
      );
      const data = await res.json();
      setVehicles(data);

      navigate(`?company=${e.target.city}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handlefilter = async (e) => {
    // console.log(e.target.name);
    if (e.target.name === "flexRadioDefault") {
      try {
        const res = await fetch(
          `http://localhost:5000/allvehicle?wheels=${e.target.value}`
        );
        const data = await res.json();
        console.log(data);
        setVehicles(data);

        navigate(`?wheels=${e.target.value}`);
      } catch (err) {
        console.log(err);
      }
    } else if (e.target.name === "companydrop") {
      try {
        const res = await fetch(
          `http://localhost:5000/allvehicle?company=${e.target.value}`
        );
        const data = await res.json();
        setVehicles(data);
        setChecked(() => {
          return { 2: false, 4: false };
        });
        navigate(`?company=${e.target.value}`);
      } catch (err) {
        console.log(err);
      }
    } else if (e.target.name === "citybox") {
      // console.log(e.target.value);
      setCityfilter(e.target.value);
      if (e.target.value === "") {
        try {
          const res = await fetch(
            `http://localhost:5000/allvehicle?city=${e.target.value}`
          );
          const data = await res.json();
          setVehicles(data);
          navigate("");
        } catch (err) {
          console.log(err);
        }
        navigate("/allvehicles");
      } else {
        try {
          const res = await fetch(
            `http://localhost:5000/allvehicle?city=${e.target.value}`
          );
          const data = await res.json();
          setVehicles(data);
          navigate(`?city=${e.target.value}`);
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  // const handleRadioInputs = (e) => {
  //   const w = e.target.value;
  //   console.log(w);
  //   const vd = [...vehicles];
  //   setVehicles(vd.filter((vehicle) => vehicle.wheels === w));
  // };
  // const handledropInputs = async (e) => {
  //   const c = e.target.value;
  //   const res = await vehicles.find({ company: c });
  //   const data = res.json();
  //   setVehicles(data);
  // };

  return (
    <>
      {/* <div className="card"> */}
        <section id="filtersection">
          {/* <div className="findby">Find By:</div> */}
          {/* <div className="container-fluid wheeltype">
            By Type:
            <div className="wheelfilter form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                checked={checked[0]}
                name="flexRadioDefault"
                id="flexRadioDefault1"
                onChange={handlefilter}
                value={2}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                2 Wheeler
              </label>
            </div>
            <div className="wheelfilter form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                checked={checked[1]}
                name="flexRadioDefault"
                id="flexRadioDefault2 "
                onChange={handlefilter}
                value={4}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                4 Wheeler
              </label>
            </div>
          </div>
          <div className="companyfilter">
            Comany:
            <select
              className="form-select companyselect"
              aria-label="Default select example"
              name="companydrop"
              onChange={handlefilter}
              value={vehicles.company}
            >
              <option value="Make">Make</option>
              <option value="BMW">BMW</option>
              <option value="Daewoo">Daewoo</option>
              <option value="Ford">Ford</option>
              <option value="Holden">Holden</option>
              <option value="Honda">Honda</option>
              <option value="Hyundai">Hyundai</option>
              <option value="Isuzu">Isuzu</option>
              <option value="Kia">Kia</option>
              <option value="Lexus">Lexus</option>
              <option value="Mazda">Mazda</option>
              <option value="Mitsubishi">Mitsubishi</option>
              <option value="Nissan">Nissan</option>
              <option value="Peugeot">Peugeot</option>
              <option value="Subaru">Subaru</option>
              <option value="Suzuki">Suzuki</option>
              <option value="Toyota">Toyota</option>
              <option value="Volkswagen">Volkswagen</option>
              <option value="Hero">Hero</option>
              <option value="Bajaj">Bajaj</option>
              <option value="Mahindra">Mahindra</option>
              <option value="TVS">TVS</option>
              <option value="Yamaha">Yamaha</option>
              <option value="Royal Enfield">Royal Enfield</option>
            </select>
          </div> */}
          <div className="cityfilter">
           <img src="https://img.icons8.com/ios-filled/30/ffffff/search--v4.png" alt=""/>
            <input
              type="text"
              name="citybox"
              value={cityfilter}
              onChange={handlefilter}
              placeholder="Search by city"
            />
          </div>
        </section>
      {/* </div> */}
      <div className="showvehicle">
        {vehicles.filter((c) => c.owner !== userData._id).length === 0 ? (
          <div className="vehicleerror">
            Sorry, Cureently No Vehicles Available
          </div>
        ) : (
          vehicles
            .filter((c) => c.owner !== userData._id)
            ?.map((v) => (
              <VehicleCard
                // key={v._id}
                // id={v._id}
                // name={v.name}
                // company={v.company}
                // wheels={v.wheels}
                // color={v.color}
                // average={v.average}
                // modelyear={v.modelyear}
                // capacity={v.capacity}
                // owner={v.owner}
                // regno={v.regno}
                // rentamount={v.rentamount}
                // available={v.available}

                v={v}
                // vehicleimgpath={
                //   "http://localhost:5000/public/image/vehicleimg/" +
                //   v.vehicleimg
                // }
              />
            ))
        )}
      </div>
    </>
  );
}

export default AllVehicles;
