import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
} from "@material-ui/icons";
import { NavLink } from "react-router-dom";
import GroupIcon from "@mui/icons-material/Group";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import EventNoteIcon from "@mui/icons-material/EventNote";
import FeedbackIcon from '@mui/icons-material/Feedback';

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
             <NavLink to="/" className="link" activeClassName="active">
              <li className="sidebarListItem">
                <LineStyle className="sidebarIcon" />
                Home
              </li>
             </NavLink>
            <NavLink to="/users" className="link">
              <li className="sidebarListItem">
                <GroupIcon className="sidebarIcon" />
                Users
              </li>
            </NavLink>
            <NavLink to="/vehicles" className="link">
              <li className="sidebarListItem">
                <DirectionsCarIcon className="sidebarIcon" />
                Vehicles
              </li>
            </NavLink>
            <NavLink to="/bookings" className="link">
              <li className="sidebarListItem">
                <EventNoteIcon className="sidebarIcon" />
                Bookings
              </li>
            </NavLink>
            <NavLink to="/reviews" className="link">
              <li className="sidebarListItem">
                <FeedbackIcon className="sidebarIcon" />
                Reviews
              </li>
            </NavLink>
          </ul>
        </div>
        {/* <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/products" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Products
              </li>
            </Link>
            <li className="sidebarListItem">
              <AttachMoney className="sidebarIcon" />
              Transactions
            </li>
            <li className="sidebarListItem">
              <BarChart className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <MailOutline className="sidebarIcon" />
              Mail
            </li>
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              Feedback
            </li>
            <li className="sidebarListItem">
              <ChatBubbleOutline className="sidebarIcon" />
              Messages
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Staff</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <WorkOutline className="sidebarIcon" />
              Manage
            </li>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <Report className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div> */}
      </div>
    </div>
  );
}
