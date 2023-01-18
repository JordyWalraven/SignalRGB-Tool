/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'

const HomePageBtn = (props) => {
  return (
    <div style={{"height":"200px",width:"250px", border:"2px solid", borderColor:'#212D3A', borderRadius:"5px", overflow:"hidden"}}>
      <img style={{height:"150px", width:"246px"}} src="https://www.mkbdigiwerkplaats.nl/wp-content/uploads/2021/04/app-development.jpg"/>
    <Link to={props.to} style={{textDecoration:"None"}}><Button variant="contained"  className="col-3 buttonColor" style={{height:"47px", backgroundColor:"#3A4E60", width:"246px"}}>{props.title}</Button></Link>
    </div>
  )
}

export default HomePageBtn
