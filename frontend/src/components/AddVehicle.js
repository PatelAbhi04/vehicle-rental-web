import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import vehiclephoto from "../image/vehicleimg.jpg";

const AddVehicle = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});

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

  useEffect(() => {
    callUser();
  }, []);

  const [vehicle, setVehicle] = useState({
    name: "",
    company: "",
    wheels: "",
    color: "",
    average: "",
    modelyear: "",
    capacity: "",
    owner: "",
    regno: "",
    rentamount: "",
    available: "",
    vehicleimg: "",
  });

  const handleInputs = (e) => {
    setVehicle({ ...vehicle, [e.target.name]: e.target.value });
  };
  const handleImgInputs = (e) => {
    setVehicle({ ...vehicle, vehicleimg: e.target.files[0] });
  };
  const handledropInputs = (e) => {
    setVehicle({ ...vehicle, company: e.target.value });
  };
  const handleRadioInputs = (e) => {
    setVehicle({ ...vehicle, wheels: e.target.value });
  };

  const sendData = async (e) => {
    e.preventDefault();

    // const {
    //   name,
    //   company,
    //   wheels,
    //   color,
    //   average,
    //   modelyear,
    //   capacity,
    //   owner,
    //   regno,
    //   available,
    // } = vehicle;

    const formData = new FormData();
    formData.append("name", vehicle.name);
    formData.append("company", vehicle.company);
    formData.append("wheels", vehicle.wheels);
    formData.append("color", vehicle.color);
    formData.append("average", vehicle.average);
    formData.append("modelyear", vehicle.modelyear);
    formData.append("capacity", vehicle.capacity);
    formData.append("owner", vehicle.owner);
    formData.append("regno", vehicle.regno);
    formData.append("rentamount", vehicle.rentamount);
    formData.append("available", vehicle.available);
    formData.append("vehicleimg", vehicle.vehicleimg);

    const res = await fetch("/registervehicle", {
     
      method: "POST",
      // headers: {
      //   "Content-Type": "application/json",
      // },
      body: formData,
    });

    const data = await res.json();
    if (data.status === 422 || !data) {
      window.alert("Invalid Vehicle data");
      console.log("Invalid Vehicle data");
    } else {
      window.alert("Vehicle added successfully frontend");
      console.log("Vehicle added successfully frontend");
      navigate("/");
    }
  };

  return (
    <>
      <section id="addvehicle">
        <div className="container mt-5">
          <div className="addvehicle-content">
            <div className="addvehicle-form">
              <h2 className="addvehicle-title">Add Vehicle</h2>
              <div className="row">
                <div className="addvehiclewhole">
                {/* <div className="col-6"> */}
                  <form
                    onSubmit={sendData}
                    className="registervehicle-form"
                    method="post"
                    encType="multipart/form-data"
                  >
                    <div className="row">
                      <div className="form-group">
                        <label className="col-6" htmlFor="name">
                          Vehicle Name:
                        </label>
                        <input
                          type="text"
                          name="name"
                          className="col-6"
                          value={vehicle.name}
                          onChange={handleInputs}
                          autoComplete="off"
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group">
                        <label className="col-6" htmlFor="vehicleimg">
                          Image:
                        </label>
                        <input
                          type="file"
                          name="vehicleimg"
                          className=" col-6"
                          onChange={handleImgInputs}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group dropdown">
                        <label
                          htmlFor="company"
                          className="control-label col-6"
                        >
                          Company:
                        </label>
                        <div className="col-6">
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            onChange={handledropInputs}
                            value={vehicle.company}
                            required
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
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group">
                        <label className="col-3 wheelsclass" htmlFor="type">
                          Wheels:
                        </label>
                        <div className="form-check form-check-inline col-1">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                            onChange={handleRadioInputs}
                            value={2}
                            required
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexRadioDefault1"
                          >
                            2
                          </label>
                        </div>
                        <div className="form-check form-check-inline col-1">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault2 "
                            onChange={handleRadioInputs}
                            value={4}
                            required
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexRadioDefault2"
                          >
                            4
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group">
                        <label className="col-6" htmlFor="color">
                          Vehicle color:
                        </label>
                        <input
                          type="text"
                          name="color"
                          className=" col-6"
                          value={vehicle.color}
                          onChange={handleInputs}
                          autoComplete="off"
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group">
                        <label className="col-6" htmlFor="average">
                          Vehicle average:
                        </label>
                        <input
                          type="number"
                          name="average"
                          className=" col-6"
                          value={vehicle.average}
                          onChange={handleInputs}
                          autoComplete="off"
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group">
                        <label className="col-6" htmlFor="modelyear">
                          Model Year:
                        </label>
                        <input
                          type="number"
                          name="modelyear"
                          className=" col-6"
                          value={vehicle.modelyear}
                          onChange={handleInputs}
                          autoComplete="off"
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group">
                        <label className="col-6" htmlFor="capacity">
                          Vehicle capacity:
                        </label>
                        <input
                          type="number"
                          name="capacity"
                          className=" col-6"
                          value={vehicle.capacity}
                          onChange={handleInputs}
                          autoComplete="off"
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group">
                        <label className="col-6" htmlFor="regno">
                          Vehicle number plate:
                        </label>
                        <input
                          type="text"
                          name="regno"
                          className=" col-6"
                          value={vehicle.regno}
                          onChange={handleInputs}
                          autoComplete="off"
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group">
                        <label className="col-6" htmlFor="rentamount">
                          Rent Amount:
                        </label>
                        <input
                          type="number"
                          name="rentamount"
                          className=" col-6"
                          value={vehicle.rentamount}
                          onChange={handleInputs}
                          autoComplete="off"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-button">
                      <input
                        type="submit"
                        name="add"
                        className="form-submit"
                        value="Add"
                      />
                    </div>
                  </form>
                </div>
                <div className="col-5">
                  <img
                    className="vehicleimg"
                    src={vehiclephoto}
                    alt="Vehicle"
                  ></img>
                  </div>
                </div>
              </div>
              </div>
            </div>
          {/* </div> */}
        {/* </div> */}
      </section>
    </>
  );
};

export default AddVehicle;
