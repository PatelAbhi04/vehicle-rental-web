import React from 'react'
import loadingimg from "../image/loading.gif";
import "./loading.css"

const Loading = () => {
  return (
    <div>
        <img className="loadingclass" src={loadingimg} alt=""/>
    </div>
  )
}

export default Loading