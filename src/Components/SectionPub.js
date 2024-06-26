import React from 'react'
import PubImg from "../images/baniere.jpeg"

const SectionPub = () => {
  return (
    <div className='' style={{background : "black" , display: "flex" ,  justifyContent: "center" }}  >
        <img style={{padding: "50px",  width : "60%" , height : "60%" , borderRadius: "60px"}} className='' src={PubImg}/>
    </div>
  )
}

export default SectionPub