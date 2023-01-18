/* eslint-disable react/no-array-index-key */
/* eslint-disable no-var */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react'
import CanvasCard from 'renderer/components/EffectComponents/CanvasCard';

const EffectSelectionPage = (props) => {

  return (
    <div style={{textAlign:"center"}}>
      <br/>
      <h1 className='basicHeader'>Select effect to edit</h1>
      <div className="container-fluid">
      <div className="row justify-content-md-center">
      {props.canvasEffects.map((effect,i) => {
        return (
          <CanvasCard canvasEffect={effect} refreshFunc={props.updateHeader}/>
        )
      })}
      </div>
      </div>
    </div>
  )
}

export default EffectSelectionPage
