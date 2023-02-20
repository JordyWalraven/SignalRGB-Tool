/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable default-case */
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
import { Autocomplete, Button, TextField ,Tooltip} from '@mui/material' ;
import React, { useEffect, useRef, useState } from 'react'
import BackButton from 'renderer/components/BackButton'
import "../css/normalizedPage.css"
import "../css/basicStyle.css"
import Select from '@mui/material/Select/Select';
import MenuItem from '@mui/material/MenuItem/MenuItem';
import { CopyBlock, atomOneDark } from 'react-code-blocks';
import EffectLogic from 'renderer/Logic/EffectLogic';
import HtmlInsertModal from 'renderer/components/NormalizedPageComponents/HtmlInsertModal';

const NormalizedPage = () => {

  const [mouse,setMouse] = useState(null);
  const [FirstPoint,setFirstPoint] = useState(null);
  const [SecondPoint,setSecondPoint] = useState(null);
  const [resolution, setResolution] = useState();
  const [meterName,setMeterName] = useState("");
  const [resolutionList, setResolutionList] = useState(["3840x2160","2560x1440","1920x1080","1280x720"]);
  const [selectedMeter, setSelectedMeter] = useState("area");
  const [meterList, setMeterList] = useState(["area","linear","colormean","ocr_textmatch","ocr_numeric"]);
  const [metaTag, setMetaTag] = useState("");
  const [resolutionTag, setResolutionTag] = useState("");
  const [availableMeters, setAvailableMeters] = useState([]);
  const [openHtmlModal, setOpenHtmlModal] = useState(false);
  const [doesMeterExist, setDoesMeterExist] = useState(false);

  useEffect(() => {

    sessionStorage.setItem("shouldGetMouse", "true");
    if(FirstPoint == null){
      sessionStorage.setItem("firstPoint", null);
    }
    if(SecondPoint == null){
      sessionStorage.setItem("secondPoint", null);
    }
    generateResolutionMeta();
    generateMeter();
  }, [FirstPoint,SecondPoint])

  useEffect(() => {
    const logic = new EffectLogic();
    generateResolutionMeta();
    generateMeter();

    if(sessionStorage.getItem("selectedEffect") != null){
      let html = JSON.parse(sessionStorage.getItem("selectedEffect")).html;
      let metaTags = logic.getMeters(html);
      let meterTags = [];
      metaTags.forEach(tag => {
        if(tag.meter !== undefined){
          meterTags.push(tag);
        }
      });

    setAvailableMeters(meterTags);
    }
  }, [selectedMeter,meterName,resolution])

  useEffect(() => {
    let localStorageRes = localStorage.getItem("resolution");
    console.log(localStorageRes)

    if(resolution == null){
      if(resolutionList.includes(`${window.screen.width}x${window.screen.height}`) === false)
      resolutionList.push(`${window.screen.width}x${window.screen.height}`)
    }
    if(localStorageRes === null){
      setResolution(`${window.screen.width}x${window.screen.height}`)
      localStorage.setItem("resolution",`${window.screen.width}x${window.screen.height}`);
    } else {
      if(resolutionList.includes(localStorageRes) === false)
      resolutionList.push(localStorageRes);
      setResolution(localStorageRes);
    }
    console.log(resolution)
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    localStorage.setItem("resolution", event.target.value);
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

  function normalizePoints(point){
    if(point != null){
      let normalizedFirstPoint = {
        X: Math.round(((point.X)/(parseInt(resolution.split("x")[0])-1)*10000))/10000,
        Y: Math.round(((point.Y)/(parseInt(resolution.split("x")[1])-1))*10000)/10000
      }
      return normalizedFirstPoint;
    }
    return null;
  }


  function generateMeter(){
    let logic = new EffectLogic();
    let meter = "<meta";
    let normalizedFirstPoint = normalizePoints(FirstPoint);
    let normalizedSecondPoint = normalizePoints(SecondPoint);
    let normalizedWidth = Math.round(normalizedSecondPoint != null && normalizedFirstPoint !=null ? ((normalizedSecondPoint.X - normalizedFirstPoint.X)*10000) : 0)/10000;
    let normalizedHeight = Math.round(normalizedSecondPoint != null && normalizedFirstPoint!=null ? (normalizedSecondPoint.Y - normalizedFirstPoint.Y)*10000 : 0)/10000;
    let hsl = FirstPoint!=null? logic.RGBToHSL(FirstPoint.RGB[0], FirstPoint.RGB[1], FirstPoint.RGB[2]):null;
    let hslString = "";
    if((selectedMeter === "area" || selectedMeter === "linear") && hsl!=null){
      let h = Math.round(hsl[0]<20? hsl[0]+20:hsl[0]>340? hsl[0]-20:hsl[0]);
      let s = Math.round(hsl[1]<20? hsl[1]+20:hsl[1]>80? hsl[1]-20:hsl[1]);
      let l = Math.round(hsl[2]<20? hsl[2]+20:hsl[2]>80? hsl[2]-20:hsl[2]);
      hslString = `h="${h-20}-${h+20}" s="${s-20}-${s+20}" l="${l-20}-${l+20}"`
    }

    console.log(hsl)
    meter += ` meter="${meterName}" type="${selectedMeter}" tags="VLC,Game" x="${normalizedFirstPoint!=null? normalizedFirstPoint.X:0}" y="${normalizedFirstPoint!=null?normalizedFirstPoint.Y:0}" width="${normalizedWidth}" `
    switch (selectedMeter) {
      case "area":
       meter += `height="${normalizedHeight}" ${hslString}`;
       break;
       case "linear":
        meter +=  `${hslString}`;
       break;
       case "ocr_textmatch":
        meter += `height="${normalizedHeight}" string="mystring" confidence="70"`;
       break;
       case "ocr_numeric":
        meter += `height="${normalizedHeight}" confidence="70"`;
       break;
       case "colormean":
        meter += `height="${normalizedHeight}"`;
        break;
    }
    meter += " />";
    setMetaTag(meter)
  }

  function generateResolutionMeta(){
    console.log(meterName)
    let meter = "<resolution";
    let normalizedFirstPoint = normalizePoints(FirstPoint);
    let normalizedSecondPoint = normalizePoints(SecondPoint);
    let normalizedWidth = Math.round(normalizedSecondPoint != null && normalizedFirstPoint !=null ? ((normalizedSecondPoint.X - normalizedFirstPoint.X)*10000) : 0)/10000;
    let normalizedHeight = Math.round(normalizedSecondPoint != null && normalizedFirstPoint!=null ? (normalizedSecondPoint.Y - normalizedFirstPoint.Y)*10000 : 0)/10000;
    console.log(selectedMeter)
    meter += ` size="${resolution}" x="${normalizedFirstPoint!=null? normalizedFirstPoint.X:0}" y="${normalizedFirstPoint!=null?normalizedFirstPoint.Y:0}" width="${normalizedWidth}" height="${normalizedHeight}" `
    meter += " />";
    setResolutionTag(meter)
  }

  function meterNameCallback(metername){
    console.log(metername)
    if(metername.type !== "click"){
      setMeterName(metername.target.value);
      let meterExists = false;
      availableMeters.forEach(meter => {
        if(meter.name === metername.target.value){
          meterExists = true;
        }
      });
      console.log(meterExists)
      setDoesMeterExist(meterExists);
    } else {
      let meterExists = false;
      availableMeters.forEach(meter => {
        console.log(meter)
        if(meter.meter === metername.target.outerText){
          meterExists = true;
        }
      });
      setDoesMeterExist(meterExists);
      setMeterName(metername.target.outerText);
    }
  }


  return (
    <>
    <HtmlInsertModal openModal={openHtmlModal} propMeterExists={doesMeterExist} />
    <br></br>
    <div className='d-flex justify-content-center' style={{"textAlign":"center","gap":"3%", minWidth:"500px"}}>
      <div className='chunkContainer' style={{width:"40%", height:"45vh", marginTop:"5vh", minHeight:"250px"}}>
      <Button variant='contained' style={{"backgroundColor":"#3A4E60", width:"80%", margin:"15px"}}>Info</Button>
      <div className='d-flex justify-content-center align-items-center gap-4'>
        <h5 className='basicHeader'>Resolution:</h5>
      <Select
      value={resolution}
      defaultValue={localStorage.getItem("resolution") == null? `${window.screen.width}x${window.screen.height}` : localStorage.getItem("resolution")}
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
      <div className='d-flex justify-content-center align-items-center gap-4 mt-2' style={{marginLeft:"-11px"}}>
        <h5 className='basicHeader'>Meter Name:</h5>
        <Autocomplete
        color='dark'
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={availableMeters.map((option) => option.meter)}
        onInputChange={meterNameCallback}
        renderInput={(params) => (
          <TextField
          sx={{input:{color:"white", textAlign:"center"}}}
          style={{ backgroundColor:"#3A4E60", width:"150px", color:"white", borderRadius:"5px"}}
            {...params}
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
            onChange={meterNameCallback}
          />
        )}
      />
      </div>
        <Tooltip title="Select Effect in the top right, otherwise the button will be disabled">
        <Button  variant='contained' style={{width:"90%", marginTop:"10px", backgroundColor:"#3A4E60"}} onClick={()=>{
          if(availableMeters.length >0){
        setOpenHtmlModal((e)=>{
          return e+1;

        });
      }
      }} >Insert Meter/Resolution</Button>
      </Tooltip>
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
    <div className='chunkContainer' style={{width:"83%", height:"20vh"}}>
      <CopyBlock height="100%" text={metaTag} language={"html"} theme={atomOneDark}  wrapLines></CopyBlock>
      <br></br>
      <CopyBlock height="100%" text={resolutionTag} language={"html"} theme={atomOneDark}  wrapLines></CopyBlock>
    </div>
    </div>
</>
  )
}

export default NormalizedPage
