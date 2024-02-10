import React, { createContext, useReducer } from "react";
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import Home from "./components/Home";
import BookingDetails from "./components/BookingDetails";
import AdminLogin from "./components/AdminLogin";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import AddVehicle from "./components/AddVehicle";
import LogOut from "./components/LogOut";
import AllVehicles from "./components/AllVehicles";
import { initialState, reducer } from "../src/reducer/UseReducer";
import VehicleDetails from "./components/VehicleDetails";
import SuccessBooking from "./components/SuccessBooking";
import VehicleBooking from "./components/VehicleBooking";

export const UserContext = createContext();

const Routing = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/user/bookingdetails" element={<BookingDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/addvehicle" element={<AddVehicle />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path="/allvehicles" element={<AllVehicles />} />
        <Route path="/vehicle/:id" element={<VehicleDetails />} />
        <Route path="/vehicle/:id/success" element={<SuccessBooking />} />
        <Route path="/vehicle/booking/:id" element={<VehicleBooking />} />
      </Routes>
    </Router>
  );
};
const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Routing />
      </UserContext.Provider>
    </>
  );
};

export default App;
