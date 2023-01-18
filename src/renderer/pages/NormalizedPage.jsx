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

  useEffect(() => {
    sessionStorage.setItem("shouldGetMouse", "true")
  }, [])


  function update(){
    try{
      window.electron.fileHander.getCursorPosition().then((result)=>{
        console.log(result)
        console.log(JSON.parse(result))
        setMouse(JSON.parse(result));
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

  return (
    <>
    <BackButton/>
    <div style={{"textAlign":"center"}}>
    <h1 className='basicHeader' >Normalized page</h1>
    </div>
    {mouse != null?
    <>
     <p className='basicHeader'>{mouse.X},{mouse.Y}</p>
     <div style={{width:"300px", height:"100px", backgroundImage: `linear-gradient(to right, rgb(${mouse.RGB[0]},${mouse.RGB[1]},${mouse.RGB[2]}), rgb(${mouse.RGB[0]},${mouse.RGB[1]},${mouse.RGB[2]})`}}/>
      </>
     :<></>}

   </>
  )
}

export default NormalizedPage
