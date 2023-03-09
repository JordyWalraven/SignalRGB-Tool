/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
/* eslint-disable prefer-template */
/* eslint-disable no-empty */
/* eslint-disable no-plusplus */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import '../../css/basicStyle.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  breakDownFrame,
  indexArray,
} from 'renderer/Logic/SVGServices/ToSvgLogic';
import { getGifImages } from 'renderer/Logic/ApiConnections/FileHandlerConnection';
import LoadingScreen from '../LoadingComponents/LoadingScreen';

const FileSelectionPage = (props) => {
  const [processFile, setProcessFile] = useState(false);

  const [loadText, setLoadText] = useState('Loading');

  const [progression, setProgression] = useState(0);

  function clickFileButton() {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = (_) => {
      // you can use this method to get file and perform respective operations
      const files = Array.from(input.files);
      console.log(files);
      setProcessFile(true);
    };
    setLoadText('Processing file');
    input.click();
  }

  function onTextFieldChange(event) {
    if (event.target.value.includes('.gif')) {
      setProcessFile(true);
      setLoadText('Fetching gif from tenor');
      getGifImages(event.target.value).then((e) => {
        const images = [];
        for (let index = 0; index < e.length; index++) {
          const image = new Image();
          image.src = 'data:image/png;base64,' + e[index];
          images.push(image);
        }
        const imagePoints = [];
        setLoadText('Start processing frames');
        setTimeout(() => {
          doFrameCalculations(0, images, imagePoints);
        }, 100);
      });
    } else {
      toast.error('Invalid Tenor Link', {
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        theme: 'colored',
      });
    }
  }

  function doFrameCalculations(i, images, imagePoints) {
    setLoadText(`Processing frame ${i + 1} of ${images.length}`);
    setProgression(((i + 1) / images.length) * 100);
    console.log(images[images.length - 1]);
    imagePoints.push(
      breakDownFrame(
        images[i],
        images[images.length - 1].width,
        images[images.length - 1].height,
        document.getElementById('excanvas')
      )
    );
    if (i < images.length - 1) {
      setTimeout(() => {
        doFrameCalculations(i + 1, images, imagePoints);
      }, 50);
    } else {
      setLoadText(`Indexing points`);
      setProgression(100);
      setTimeout(() => {
        imagePoints = indexArray(imagePoints);
        props.setSVGArray(imagePoints);
      }, 50);
    }
  }
  return (
    <>
      {processFile ? (
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
            flexDirection: 'column',
          }}
        >
          <canvas id="excanvas" style={{ width: '30%', height: '50%' }} />
          <LoadingScreen textValue={loadText} progress={progression} />
        </div>
      ) : (
        <div
          style={{
            marginLeft: '15%',
            marginTop: '10%',
            width: '70vw',
            height: '50vh',
            background: '#212D3A',
            borderRadius: '50px',
          }}
          className="d-flex justify-content-center align-items-center"
        >
          <Button
            onClick={clickFileButton}
            variant="contained"
            style={{
              height: '50px',
              width: '200px',
              backgroundColor: '#3A4E60',
              color: 'white',
              borderRadius: '50px',
              fontSize: '20px',
            }}
          >
            Select File
          </Button>
          <h2 className="basicHeader m-4"> OR </h2>
          <TextField
            onChange={onTextFieldChange}
            id="outlined-basic"
            label="PASTE TENOR LINK"
            style={{
              border: '0px',
              height: '50px',
              width: '200px',
              backgroundColor: '#3A4E60',
              color: 'white',
              fontSize: '20px',
              textAlign: 'center',
            }}
            InputLabelProps={{ style: { color: 'white' } }}
          />
        </div>
      )}
    </>
  );
};

export default FileSelectionPage;
