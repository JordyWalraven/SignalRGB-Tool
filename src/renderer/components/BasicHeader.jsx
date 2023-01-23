/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable prefer-const */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "../css/basicStyle.css"
import HomeIcon from '@mui/icons-material/Home';

const BasicHeader = (props) => {

  const [effectName, setEffectName] = useState("")
  const navigate = useNavigate();

  useEffect(() => {
    console.log(props.effect)
    setEffectName(props.effect.name);
  }, [props.effect])



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
    <Button onClick={clickHandler} variant='contained' style={{position:"absolute", right:"20px", marginTop:"0px"}}>Change selected effect</Button>
    <p className='basicHeader' style={{position:"absolute", right:"20px", marginTop:"40px"}}>Current: {effectName}</p>
    </div>
  )
}

export default BasicHeader
