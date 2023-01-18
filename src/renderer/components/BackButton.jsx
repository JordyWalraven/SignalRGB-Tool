/* eslint-disable prettier/prettier */
import React from 'react'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'

const BackButton = () => {
  return (
    <Link to="/" style={{"textDecoration":"None"}}>
    <Button variant="contained" color="error"  style={{height:"20px", margin:"2%", paddingLeft:"2%",paddingRight:"2%", paddingTop:"1%", paddingBottom:"1%"}}>Back</Button>
    </Link>
  )
}

export default BackButton
