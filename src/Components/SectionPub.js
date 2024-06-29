import React from 'react'
import PubImg from "../images/baniere.jpeg"

const SectionPub = () => {
  return (
    <div className='' style={{background : "black" , display: "flex" ,  justifyContent: "center" }}  >
        <img className="pub" style={{padding: "50px",  width : "80%"  , borderRadius: "90px"}} src={PubImg}/>
    </div>
  )
}

export default SectionPub