import React,{useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom';
import "../components/widgetLg/widgetLg.css";

const Review = () => {
  const [totalReviews, setTotalReviews] = useState([]);
  const [admin, setAdmin] = useState({});
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

  const fetchReviews = async () => {
    const res = await fetch("/totalreviews");
    const data = await res.json();
    setTotalReviews(data);
  }

  useEffect(() => {
    fetchReviews();
  }, [])
  return (
    <>
      <div className="widgetLg">
        <h3 className="widgetLgTitle">User Feedbacks</h3>
        <table className="widgetLgTable">
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Booking ID</th>
            <th className="widgetLgTh">User</th>
            <th className="widgetLgTh">Vehicle</th>
            <th className="widgetLgTh">Rating</th>
            <th className="widgetLgTh">Review</th>
          </tr>
          {totalReviews.length === 0 ? (
            <div>No Reviews Found...</div>
          ) : (
            totalReviews.map((review) => {
              return (
                <>
                  <tr className="widgetLgTr">
                    <td className="widgetLgUser">
                      {review.bookingId}
                    </td>
                    <td className="widgetLgStatus"><p>{review.userName}</p><p>{review.userId}</p></td>
                    <td className="widgetLgStatus"><p>{review.vehicleName}</p><p>{review.vehicleId}</p></td>
                    <td className="widgetLgStatus">{review.rating}</td>
                    <td className="widgetLgStatus">
                      {review.review}
                    </td>
                  </tr>
                </>
              )
            }
            )
          )
          }
        </table>
      </div>
    </>
  )
}

export default Review