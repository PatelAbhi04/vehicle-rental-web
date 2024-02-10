import React,{useEffect,useState} from "react";
// import "../components/widgetLg/widgetLg.css";
// import "../App.css"
import "./Profile.css";
const Profile = () => {
  const [admin, setAdmin] = useState({});
  let [loading, setLoading] = useState(true);
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
      setLoading(false);

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
  return (
    <>
      {loading ? "Loading" : (
      <div className="container rounded bg-white mt-5 mb-5">
        <div className="profile">
          <h2 className="text-right">Profile</h2>
          <div className="row">
            <div className="col-2 border-right">
              <div className="d-flex flex-column align-items-center text-center p-3 py-5"><img className="rounded-circle mt-5" width="150px" src={`http://localhost:5000/public/image/adminimg/${admin.adminimg}`} /></div>
            </div>
            <div className="col- border-right">
              <div className="p-3 py-5">
                <div className="row mt-2">
                  <div className="col-md-6"><label className="labels">First Name: </label>{admin.fname}</div>
                  <div className="col-md-6"><label className="labels">Last Name: </label>{admin.lname}</div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12"><label className="labels">Mobile Number: </label>{admin.phone}</div>
                  <div className="col-md-12"><label className="labels">Email ID: </label>{admin.email}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )
}

      {/* <div className="container-fluid">
      <div className="profile">
        <h3 className="text-dark mb-4">Profile</h3>
        <div className="row mb-3">
          <div className="col-lg-4">
            <div className="card mb-3">
              <div className="card-body text-center shadow">
                <img
                  className="rounded-circle mb-3 mt-4 adminimg"
                  src="assets/img/dogs/image2.jpeg"
                  width="160"
                  height="160"
                  alt="adminimg"
                />
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="row">
              <div className="col-4">
                <div className="card shadow mb-3">
                  <div className="card-body">
                      <div className="row">
                        <div className="col">
                          <div className="mb-3">
                            <label className="form-label" for="firstname">
                              <strong>First Name</strong>
                            </label>
                            Fname
                          </div>
                        </div>
                        <div className="col">
                          <div className="mb-3">
                            <label className="form-label" for="lastname">
                              <strong>Last Name</strong>
                            </label>
                           Lname
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <div className="mb-3">
                            <label className="form-label" for="phone">
                              <strong>Contact Number</strong>
                            </label>
                            Mo number
                          </div>
                        </div>
                        <div className="col">
                          <div className="mb-3">
                            <label className="form-label" for="email">
                              <strong>Email</strong>
                            </label>
                            Email
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
                <div className="card shadow"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="card shadow mb-5"></div>
      </div>
      </div> */}
    </>
  );
};

export default Profile;
