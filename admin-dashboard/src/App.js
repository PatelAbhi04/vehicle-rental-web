import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
// import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Users from "./pages/Users";
import Vehicles from "./pages/Vehicles";
import Bookings from "./pages/Bookings";
import User from "./pages/user/User";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Review from "./pages/Review";

function App() {
  return (
    <Router>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/users">
            <Users />
          </Route>
          <Route path="/vehicles">
            <Vehicles />
          </Route>
          <Route path="/bookings">
            <Bookings />
          </Route>
          <Route path="/reviews">
            <Review />
          </Route>
          <Route path="/profile">
            <User />
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
