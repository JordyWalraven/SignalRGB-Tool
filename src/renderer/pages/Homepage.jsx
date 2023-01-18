/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react'
import HomePageBtn from 'renderer/components/HomePageBtn'

import "../css/basicStyle.css"


const Homepage = () => {
  useEffect(() => {
   sessionStorage.setItem("shouldGetMouse", "false")
  }, [])


  return (
    <div style={{width:"99vw", height:"70vh", display:"flex",justifyContent:"center", marginTop:"2%"}}>
     <div style={{width:"80%", height:"80%", display:"flex", justifyContent:"center"}}>
     <div className="container" style={{"textAlign":"center"}}>
      <div className="row d-flex justify-content-center">
        <div className="col d-flex justify-content-center">
        <HomePageBtn to="normalized" title="Normalized app" imgUrl=""/>
        </div>
        <div className="col d-flex justify-content-center">
        <HomePageBtn to="" />
        </div>
        <div className="col d-flex justify-content-center">
        <HomePageBtn to="/" title=""/>
        </div>

      </div>

    </div>

     </div>

    </div>
  )
}

export default Homepage
