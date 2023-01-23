/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React,{useState,useEffect} from 'react'
import { Modal, Typography, Box } from '@mui/material'
import "../../css/ComponentCss/htmlInsertModal.css"
import "../../css/basicStyle.css"

const HtmlInsertModal = (props) => {

  const [open, setOpen] = useState(false);
  const [meter, setMeter] = useState(0);



  useEffect(() => {
    if(props.openModal>0)
    setOpen(true)
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
    <h2 className='basicHeader m-2' >
      HTML INJECTOR
    </h2>
  </Box>
</Modal>
  )
}

export default HtmlInsertModal
