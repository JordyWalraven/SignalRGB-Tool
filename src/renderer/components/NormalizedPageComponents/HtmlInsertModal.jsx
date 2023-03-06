/* eslint-disable no-nested-ternary */
/* eslint-disable no-lonely-if */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React,{useState,useEffect} from 'react'
import { Modal, Typography, Box } from '@mui/material'
import "../../css/ComponentCss/htmlInsertModal.css"
import "../../css/basicStyle.css"
import { electron } from 'process'

const HtmlInsertModal = (props) => {

  const [open, setOpen] = useState(false);
  const [meter, setMeter] = useState(0);
  const [resolution,setResolution] = useState(0);
  const [screenResolution,setScreenResolution] = useState(0);
  const [is16x9,setIs16x9] = useState(false);



  useEffect(() => {
    const screenRes = localStorage.getItem("resolution")
    setScreenResolution(screenRes)
    if(props.openModal>0){
      setOpen(true)
    }

    if(screenRes === "1920x1080"|| screenRes === "2560x1440" || screenRes === "3840x2160"){
      setMeter(props.meterString)
      setIs16x9(true)
    }else {
      setIs16x9(false)
      if(!props.propMeterExists){
        setMeter(props.meterString)
      } else {
        setResolution(props.resolutionString)
      }

    }

    console.log(meter)
  }, [props.openModal])

  const handleClose = () => {setOpen(false)};

  return (
    <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box className="modalBox" >
    <h2 className='basicHeader m-2 ' >
      HTML INJECTOR
    </h2>
    <br/>
    <div>
      <h3 className='basicHeader'>{is16x9?"Are you sure you want to modify the current meter":!props.propMeterExists?"Are you sure you want to modify the current meter":"Are you sure you want to add/overwrite "}</h3>
      <p style={{color:"white"}}>
        {!props.propMeterExists||is16x9? meter : resolution}
      </p>
    </div>
  </Box>
</Modal>
  )
}

export default HtmlInsertModal
