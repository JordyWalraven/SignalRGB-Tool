/* eslint-disable radix */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-else-return */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/function-component-definition */
/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
/* eslint-disable prefer-destructuring */
/* eslint-disable prefer-const */
/* eslint-disable global-require */
/* eslint-disable prettier/prettier */
import { Button, Input } from '@mui/material';
import React, { useEffect, useState } from 'react'
import BackButton from 'renderer/components/BackButton'
import "../css/normalizedPage.css"
import "../css/basicStyle.css"
import Select from '@mui/material/Select/Select';
import MenuItem from '@mui/material/MenuItem/MenuItem';

const NormalizedPage = () => {

  const [mouse,setMouse] = useState(null);
  const [FirstPoint,setFirstPoint] = useState(null);
  const [SecondPoint,setSecondPoint] = useState(null);
  const [resolution, setResolution] = useState();
  const [resolutionList, setResolutionList] = useState(["3840x2160","2560x1440","1920x1080","1280x720"]);
  const [selectedMeter, setSelectedMeter] = useState();
  const [meterList, setMeterList] = useState(["area","linear","colormean","ocr"]);



  useEffect(() => {
    sessionStorage.setItem("shouldGetMouse", "true");
    if(FirstPoint == null){
      sessionStorage.setItem("firstPoint", null);
    }
    if(SecondPoint == null){
      sessionStorage.setItem("secondPoint", null);
    }
  }, [FirstPoint,SecondPoint])

  useEffect(() => {
    if(resolution == null){
      setResolution(`${window.screen.width}x${window.screen.height}`)

    }
    console.log(resolution)
  }, [resolution])


  function update(){
    let KeyPressState;
    try{
      window.inputHandler.getKeyDown().then((result)=>{
        KeyPressState = result;
      })
    } catch (error){
      console.log(error)
    }

    try{
      window.inputHandler.getCursorPosition().then((result)=>{
        setMouse(JSON.parse(result));

        if(KeyPressState === "control"){
          if(sessionStorage.getItem("firstPoint") === "null"){
            sessionStorage.setItem("firstPoint",result)
            setFirstPoint(JSON.parse(result))
          }
        } else if(KeyPressState === "shift"){
          if(sessionStorage.getItem("secondPoint") === "null"){
          sessionStorage.setItem("secondPoint",result)
          setSecondPoint(JSON.parse(result))
          }
        }
      })
    } catch (error){
      console.log(error)
    }
  setTimeout(() => {
   if(sessionStorage.getItem("shouldGetMouse") === "true"){
    window.requestAnimationFrame(update);
   } else {
    window.cancelAnimationFrame(update);
   }
  }, 50);
  }


  if(mouse==null)
  window.requestAnimationFrame(update);

  function getColor(){
    if(mouse == null){
      return "#3A4E60"
    }
    if(FirstPoint != null && SecondPoint != null){
      return `linear-gradient(to right, rgb(${FirstPoint.RGB[0]},${FirstPoint.RGB[1]},${FirstPoint.RGB[2]}), rgb(${SecondPoint.RGB[0]},${SecondPoint.RGB[1]},${SecondPoint.RGB[2]})`
    } else if(FirstPoint != null){
      return `linear-gradient(to right, rgb(${FirstPoint.RGB[0]},${FirstPoint.RGB[1]},${FirstPoint.RGB[2]}), rgb(${mouse.RGB[0]},${mouse.RGB[1]},${mouse.RGB[2]})`
    } else if (SecondPoint != null){
      return `linear-gradient(to right, rgb(${mouse.RGB[0]},${mouse.RGB[1]},${mouse.RGB[2]}), rgb(${SecondPoint.RGB[0]},${SecondPoint.RGB[1]},${SecondPoint.RGB[2]})`
    } else {
      return `linear-gradient(to right, rgb(${mouse.RGB[0]},${mouse.RGB[1]},${mouse.RGB[2]}), rgb(${mouse.RGB[0]},${mouse.RGB[1]},${mouse.RGB[2]})`
    }
  }


  function handleResolutionChange(event) {
    console.log(event)
    setResolution(event.target.value);
  }

  function handleMeterChange(event) {
    console.log(event)
    setSelectedMeter(event.target.value);
  }

  function getMousePos(normalized = false){
    if(mouse != null){
      if(normalized){
        return `X:${Math.round((mouse.X/parseInt(resolution.split("x")[0])*100))/100} Y:${Math.round((mouse.Y/parseInt(resolution.split("x")[1]))*100)/100}`
      } else {
        return `X:${mouse.X} Y:${mouse.Y}`
      }
    } else {
      return "X:0 Y:0";
    }
  }

  function clearMousePosition(){
    setFirstPoint(null);
    setSecondPoint(null);
    sessionStorage.setItem("firstPoint", null);
    sessionStorage.setItem("secondPoint", null);
  }



  return (
    <>
        <BackButton />
       <div className='d-flex justify-content-center' style={{"textAlign":"center"}}>
    <h1 className='basicHeader' >Normalized page</h1>
    </div>

    <div className='d-flex justify-content-center' style={{"textAlign":"center","gap":"3%", minWidth:"500px"}}>
      <div className='chunkContainer' style={{width:"40%", height:"45vh", marginTop:"5vh", minHeight:"250px"}}>
      <Button variant='contained' style={{"backgroundColor":"#3A4E60", width:"80%", margin:"5%"}}>Info</Button>
      <div className='d-flex justify-content-center align-items-center gap-4'>
        <h5 className='basicHeader'>Resolution:</h5>
      <Select
      value={resolution}
      defaultValue={`${window.screen.width}x${window.screen.height}`}
      style={{color:"white", backgroundColor:"#3A4E60",width:"150px"}}
      onChange={handleResolutionChange}>
        {resolutionList.map((item)=>{
          return(
            <MenuItem value={item}>{item}</MenuItem>
          )
        })}
      </Select>
      </div>
      <div className='d-flex justify-content-center align-items-center gap-4 mt-2'>
        <h5 className='basicHeader'>Meter type:</h5>
      <Select
      value={selectedMeter}
      defaultValue='area'
      style={{color:"white", backgroundColor:"#3A4E60", width:"150px"}}
      onChange={handleMeterChange}>
        {meterList.map((item)=>{
          return(
            <MenuItem value={item}>{item}</MenuItem>
          )
        })}
      </Select>
      </div>
      <div className='d-flex justify-content-center align-items-center gap-4 mt-2'>
        <h5 className='basicHeader'>Meter name:</h5>
        <Input type='text' style={{color:"white", backgroundColor:"#3A4E60", width:"150px", marginLeft:"-10px", padding:"5px"}}></Input>
      </div>
    </div>

      <div style={{width:"40%", marginTop:"5vh", minHeight:"250px"}}>
      <div className='chunkContainer' style={{width:"100%", height:"20vh", minHeight:"115px"}}>
      <div className='d-flex justify-content-center align-items-center gap-4'>
        <div>
        <h5 className='basicHeader'>Raw:</h5>
        <h5 className='basicHeader'>{getMousePos()}</h5>
        </div>

        <div>
        <h5 className='basicHeader'>Normalized:</h5>
        <h5 className='basicHeader'>{getMousePos(true)}</h5>
        </div>

      </div>
      <div className='d-flex justify-content-center mt-4 align-items-center'>
        <h5 className='basicHeader' style={{color:FirstPoint==null?"red":"green"}}>First Point</h5>
        <Button onClick={clearMousePosition} variant='contained' style={{backgroundColor:"#3A4E60", marginLeft:"10px",marginRight:"10px", maxHeight:"50px"}}>Clear points</Button>
        <h5 className='basicHeader' style={{color:SecondPoint==null?"red":"green"}}>Second Point</h5>
        </div>
      </div>
      <div className='chunkContainer' style={{width:"100%", height:"20vh", minHeight:"115px",marginTop:"5vh",backgroundImage:getColor()}}></div>
      </div>
    </div>
    <div  style={{width:"100%", marginTop:"2%", minWidth:"500px"}} className="d-flex justify-content-center">
    <div className='chunkContainer' style={{width:"83%", height:"20vh"}}></div>
    </div>
</>
  )
}

export default NormalizedPage
