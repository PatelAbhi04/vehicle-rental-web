import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import "../components/widgetLg/widgetLg.css";
import Loading from "./Loading"

const Users = () => {
  // const Button = ({ type }) => {
  //   return <button className={"widgetLgButton " + type}>{type}</button>;
  // };
  const history = useHistory();
  const [totalUsers, setTotalUsers] = useState([]);
  const [admin, setAdmin] = useState({});
  let [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    const res = await fetch("/totalusers");
    const data = await res.json();
    setTotalUsers(data);
  }
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

  useEffect(() => {
    fetchUsers();
  }, [])

  // const deleteUser = async (id) => {
  //   try{
  //     const res=await fetch(`http://localhost:5000/deleteuser/${id}`,{
  //       method:"delete"
  //     });
  //     const data=await res.json();
  //     setLoading("true");
  //     setTotalUsers(data);
  //     const tu=[...totalUsers];
  //     setTotalUsers(tu.filter((p)=>p._id!==id));
  //     setLoading("false");
  //   }catch(err){
  //     console.log(err);
  //   }
  // };

  const deleteUser = (id) => {
    fetch(`http://localhost:5000/deleteuser/${id}`, {
      method: "delete"
    }).then((res) => {
      console.log(res);
    }).then((data) => {
      setLoading(true);
      setTotalUsers(data);
      const tu = [...totalUsers];
      setTotalUsers(tu.filter((p) => p._id !== id));
      setLoading(false);
    })
  };
  return (
    <>
      <div className="widgetLg">
        <h3 className="widgetLgTitle">User Details</h3>
        <table className="widgetLgTable">
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Full Name</th>
            <th className="widgetLgTh">Email</th>
            <th className="widgetLgTh">Mo.</th>
            <th className="widgetLgTh">DOB</th>
            <th className="widgetLgTh">Licenso No.</th>
            <th className="widgetLgTh"></th>
          </tr>
          {loading ? <Loading /> : (
            totalUsers.map((user) => {
              return(
                <tr className="widgetLgTr">
                    <td className="widgetLgUser">
                      <img
                        src={`http://localhost:5000/public/image/userimg/${user.userimg}`}
                        alt=""
                        className="widgetLgImg"
                      />
                      <span className="widgetLgName">{user.fname} {user.lname}</span>
                    </td>
                    <td className="widgetLgDate">{user.email}</td>
                    <td className="widgetLgAmount">{user.phone}</td>
                    <td className="widgetLgAmount">{user.dob}</td>
                    <td className="widgetLgAmount">{user.license}</td>
                    <td className="widgetLgStatus">
                      {console.log(user._id)}
                      <NavLink to="/users"
                          type="Submit"
                          className="Delete"
                          onClick={()=>deleteUser(user._id)}
                        >
                        Delete
                      </NavLink>
                    </td>
                  </tr>
              )
                  
            })
          )
          
          }
        </table>
      </div>
    </>
  );
};

export default Users;
