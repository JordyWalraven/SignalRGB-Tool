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
        <br />
        <br />
        <LinearProgress
          sx={{ width: '50vw' }}
          variant="determinate"
          value={progressState}
        />
        <p className="basicHeader">{displayText}</p>
    </>
  );
};

export default LoadingScreen;
