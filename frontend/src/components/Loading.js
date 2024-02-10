import React from 'react'
import loadingimg from "../image/loading.gif"
import "../App.css"

const Loading = () => {
  return (
    <div>
        <img className="loadingclass" src={loadingimg} alt=""/>
    </div>
  )
}

export default Loading