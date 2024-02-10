import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import {NavLink} from "react-router-dom";

function FeaturedInfo(props) {
  return (
    <>
    <div className="featured">
    <NavLink to="/users" className="userItem">
      
      
        <span className="featuredTitle">Users</span>
        <div className="featuredMoneyContainer">
        
          <span className="featuredCount">{props.users}</span>
         
          {/* <span className="featuredMoneyRate">
            -11.4 <ArrowDownward  className="featuredIcon negative"/>
          </span> */}
        </div>
        
        {/* <span className="featuredSub">Compared to last month</span> */}
     
      </NavLink>
      <NavLink to="/vehicles" className="vehicleItem">
   
      
        <span className="featuredTitle">Vehicles</span>
        
        <div className="featuredMoneyContainer">
          <span className="featuredCount">{props.vehicles}</span>
          {/* <span className="featuredMoneyRate">
            -1.4 <ArrowDownward className="featuredIcon negative"/>
          </span> */}
     
        
        {/* <span className="featuredSub">Compared to last month</span> */}
      </div>
      </NavLink>
     <NavLink to="/bookings" className="bookingItem">
 
      
        <span className="featuredTitle">Bookings</span>
       
        <div className="featuredMoneyContainer">
          <span className="featuredCount">{props.bookings}</span>
          {/* <span className="featuredMoneyRate">
            +2.4 <ArrowUpward className="featuredIcon"/>
          </span> */}
     
        {/* <span className="featuredSub">Compared to last month</span> */}
      </div>
      </NavLink>
    </div>
    </>
  );
}

export default FeaturedInfo;