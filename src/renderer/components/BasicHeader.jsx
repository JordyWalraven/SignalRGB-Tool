/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable prefer-const */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import React from 'react'
import { useNavigate } from 'react-router-dom'
import "../css/basicStyle.css"
import HomeIcon from '@mui/icons-material/Home';

const BasicHeader = () => {

  const navigate = useNavigate();




  function clickHandler(){
    navigate("/effectSelection")
  }

  function homeClicked(){
    navigate("/")
  }

  return (

    <div style={{"paddingTop":"1vh", "paddingBottom":"1vh", backgroundColor:"#212D3A", borderRadius:"5px", display:"flex", justifyContent:"center"}}>
    <HomeIcon onClick={homeClicked} style={{position:"absolute", left:"30px", height:"50px", width:"50px", color:"#3A4E60", cursor:"grab"}}/>
    <h1 className='basicHeader'>SIGNALTOOLS</h1>
    </div>
  )
}

export default BasicHeader
