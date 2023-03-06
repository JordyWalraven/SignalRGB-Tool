/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import '../../css/basicStyle.css';

const LoadingScreen = (props) => {
  const [progressState, setProgressState] = useState(0);
  const [displayText, setDisplayText] = useState('Loading');

  useEffect(() => {
    setProgressState(props.progress);
  }, [props.progress]);

  useEffect(() => {
    setDisplayText(props.textValue);
  }, [props.textValue]);

  return (
    <>
      <div
        style={{
          marginLeft: '15%',
          marginTop: '10%',
          width: '70vw',
          height: '50vh',
          background: '#212D3A',
          borderRadius: '50px',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column'
        }}
      >
        <br />
        <br />
        <LinearProgress
          sx={{ width: '50vw' }}
          variant="determinate"
          value={progressState}
        />
        <p className="basicHeader">{displayText}</p>
      </div>
    </>
  );
};

export default LoadingScreen;
