/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable prettier/prettier */
import React,{useEffect,useState} from 'react'
import "../../css/basicStyle.css"
import "../../css/animations.css"
import { useNavigate } from 'react-router-dom'

const CanvasCard = (props) => {

  const [effectName, setEffectName] = useState("")
  const navigate = useNavigate();

  useEffect(() => {
    const frame = document.getElementById('effect')
    frame.onerror = errorHandler;
    const iframeWindow = frame.contentWindow;
    iframeWindow.console.log = function() {};
    setEffectName(props.canvasEffect.name);
  }, [props.canvasEffect])

  function errorHandler(){
    console.log("error");
  }


  function selectEffect(){
    sessionStorage.setItem("selectedEffect",JSON.stringify(props.canvasEffect))
    props.refreshFunc();
    navigate("/")
  }

  return (
    <div className='borderEffect' onClick={selectEffect} style={{position:"relative", textAlign:"center","height":"250px",width:"321px", border:"2px solid", borderColor:'#212D3A', borderRadius:"5px", overflow:"hidden", marginTop:"20px", marginLeft:"10px", marginRight:"10px"}}>
      <h1 className='basicHeader hoverColorTitle' style={{position:"absolute", zIndex:2,left:"25%",top:"30%",fontSize:"50px"}}>Select</h1>
    <iframe className='frame' scrolling='no' id='effect' style={{marginLeft:"-10px", height:"200px", width:"320px"}} srcDoc={props.canvasEffect.html}/>
    <h3 className='basicHeader effectTitle'>{effectName.toUpperCase()}</h3>
  </div>
  )
}

export default CanvasCard
