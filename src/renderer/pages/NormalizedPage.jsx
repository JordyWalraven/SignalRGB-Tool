/* eslint-disable no-else-return */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/function-component-definition */
/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
/* eslint-disable prefer-destructuring */
/* eslint-disable prefer-const */
/* eslint-disable global-require */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import BackButton from 'renderer/components/BackButton'


const NormalizedPage = () => {

  const [mouse,setMouse] = useState(null);
  const [FirstPoint,setFirstPoint] = useState(null);
  const [SecondPoint,setSecondPoint] = useState(null);



  useEffect(() => {
    sessionStorage.setItem("shouldGetMouse", "true");
    if(FirstPoint == null){
      sessionStorage.setItem("firstPoint", null);
    }
    if(SecondPoint == null){
      sessionStorage.setItem("secondPoint", null);
    }
  }, [FirstPoint,SecondPoint])


  function update(){
    let KeyPressState;
    try{
      window.electron.fileHander.getKeyDown().then((result)=>{
        KeyPressState = result;
      })
    } catch (error){
      console.log(error)
    }

    try{
      window.electron.fileHander.getCursorPosition().then((result)=>{
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

  return (
    <>
    <BackButton/>
    <div style={{"textAlign":"center"}}>
    <h1 className='basicHeader' >Normalized page</h1>
    </div>
    {mouse != null?
    <>
     <p className='basicHeader'>{mouse.X},{mouse.Y}</p>
     <div style={{width:"300px", height:"100px", backgroundImage:getColor()}}/>
      </>
     :<></>}

   </>
  )
}

export default NormalizedPage
