import React, { useState,useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
//import axios from "axios";

const Register = () => {
  const ref = useRef();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    userimg: "",
    email: "",
    password: "",
    dob:"",
    phone: "",
    address: "",
    pincode: "",
    city: "",
    license: "",
  });

  //const [, setUserImg] = useState({ photo: "" });

  const handleInputs = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleImgInputs = (e) => {
    setUser({ ...user, userimg: e.target.files[0] });
  };

  const postData = async (e) => {
    e.preventDefault();

    // const {
    //   fname,
    //   lname,
    //   email,
    //   password,
    //   phone,
    //   address,
    //   pincode,
    //   city,
    //   license,
    // } = user;

    const formData = new FormData();
    formData.append("fname", user.fname);
    formData.append("lname", user.lname);
    formData.append("userimg", user.userimg);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("dob", user.dob);
    formData.append("phone", user.phone);
    formData.append("address", user.address);
    formData.append("pincode", user.pincode);
    formData.append("city", user.city);
    formData.append("license", user.license);

    const res = await fetch("/signup", {
      method: "POST",
      // headers: {
      //   "Content-Type": "multipart/form-data",
      // },
      body: formData,
    });

    // try {
    //   const res = await axios
    //     .post("http://localhost:5000/signup", formData)
    //     .then((res) => {
    //       console.log(res);
    //       //navigate.push("/login");
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    //   const data = await res.json();
    //   if (data.status === 422 || !data) {
    //     window.alert("Invalid Registration");
    //     console.log("Invalid Registration");
    //   } else {
    //     window.alert("Registration Successfull");
    //     console.log("Registration Successfull");

    //     navigate("/login");
    //   }
    // } catch (err) {
    //   console.log(err);
    // }

    const data = await res.json();
    if (data.status === 422 || !data) {
      // window.alert("Invalid Registration");
      console.log("Invalid Registration");
    } else {
      // window.alert("Registration Successfull");
      console.log("Registration Successfull");
      navigate("/login");
    }
  };

  return (
    <>
      <section id="signup">
        <div className="container mt-5">
          <div className="signup-content">
            <div className="signup-form">
              <h2 className="form-title">Sign Up</h2>
              <form
                onSubmit={postData}
                className="registration-form"
                method="post"
                encType="multipart/form-data"
              >
                <div className="form-group">
                  <label htmlFor="fname">
                    <i className="fa fa-user"></i>
                  </label>
                  <input
                    type="text"
                    name="fname"
                    className="form-field"
                    value={user.fname}
                    onChange={handleInputs}
                    autoComplete="off"
                    placeholder="Your First Name"
                    required
                  />
                  <div className="valid-feedback">Looks good!</div>
                </div>

                <div className="form-group">
                  <label htmlFor="lname">
                    <i className="fa fa-user"></i>
                  </label>
                  <input
                    type="text"
                    name="lname"
                    className="form-field"
                    value={user.lname}
                    onChange={handleInputs}
                    autoComplete="off"
                    placeholder="Your Last Name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="userimg">
                    <i className="fas fa-camera"></i>
                  </label>
                  <input class="form-control" type="file" id="formFile" name="userimg"
                    className="form-field"
                    onChange={handleImgInputs}
                    accept="image/*"
                    required />
                  {/* <input
                    type="file"
                    name="userimg"
                    className="form-field"
                    onChange={handleImgInputs}
                  /> */}
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    <i className="fa fa-envelope"></i>
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-field"
                    value={user.email}
                    onChange={handleInputs}
                    autoComplete="off"
                    placeholder="Your Email Id"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">
                    <i className="fa fa-lock"></i>
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="form-field"
                    value={user.password}
                    onChange={handleInputs}
                    autoComplete="off"
                    placeholder="Password"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="dob">
                  <i class="fas fa-birthday-cake"></i>
                  </label>
                  <input
                    type="date"
                    name="dob"
                    className="form-field"
                    value={user.dob}
                    onChange={handleInputs}
                    autoComplete="off"
                    placeholder="Your Birthdate"
                    required
                  />
                  {/* <input type="text" ref={ref} placeholder="Date of birth" onfocus={()=> ref.current.type="date"} name="dob"
                    className="form-field"
                    value={user.dob}
                    onChange={handleInputs}
                    autoComplete="off"/>  */}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">
                    <i className="fa fa-mobile"></i>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="form-field"
                    value={user.phone}
                    onChange={handleInputs}
                    pattern="[0-9]{10}"
                    autoComplete="off"
                    placeholder="Your Phone Number"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="address">
                    <i className="fa fa-map-marker-alt"></i>
                  </label>
                  <input
                    type="text"
                    name="address"
                    className="form-field"
                    value={user.address}
                    onChange={handleInputs}
                    autoComplete="off"
                    placeholder="Your Full Address"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="pincode">
                    <i className="fas fa-map-pin"></i>
                  </label>
                  <input
                    type="number"
                    name="pincode"
                    className="form-field"
                    value={user.pincode}
                    onChange={handleInputs}
                    autoComplete="off"
                    placeholder="Your pincode"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="city">
                    <i className="fas fa-city"></i>
                  </label>
                  <input
                    type="text"
                    name="city"
                    className="form-field"
                    value={user.city}
                    onChange={handleInputs}
                    autoComplete="off"
                    placeholder="Your city"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="license">
                    <i className="fas fa-id-badge"></i>
                  </label>
                  <input
                    type="text"
                    name="license"
                    className="form-field"
                    value={user.license}
                    onChange={handleInputs}
                    autoComplete="off"
                    placeholder="Your License Number"
                    required
                  />
                </div>

                <div className="form-button">
                  <input
                    type="submit"
                    name="register"
                    className="form-submit"
                    value="Register"
                  />
                </div>
              </form>
              <a href="/login">Already have an account?</a>
            </div>
          </div>
        </div>
      </section>
      ;
    </>
  );
};

export default Register;
