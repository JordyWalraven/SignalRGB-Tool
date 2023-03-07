/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
import React, { useState, useEffect } from 'react';

const SVGPreviewerPage = (props) => {
  useEffect(() => {
    if (props.finalResult === null) return;
    console.log(props.finalResult);
    window.requestAnimationFrame(function () {
      update(0, props.finalResult);
    });
  }, [props.finalResult]);

  function update(counter, svgArray) {
    try {
      const canvas = document.getElementById('exCanvas');
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'black';

      const localizedCounter = counter % svgArray.length;

      if (Array.isArray(svgArray[localizedCounter]) === true) {
        ctx.beginPath();
        ctx.moveTo(
          svgArray[localizedCounter][0][0],
          svgArray[localizedCounter][0][1]
        );
        for (
          let index = 0;
          index < svgArray[localizedCounter].length;
          index++
        ) {
          const element = svgArray[localizedCounter][index];
          ctx.lineTo(element[0], element[1]);
        }
        ctx.closePath();
        ctx.fill();
      }
      const newCounter = counter + 1;
      // eslint-disable-next-line prettier/prettier
      setTimeout(() => {
        if (document.getElementById('exCanvas') !== null) {
          window.requestAnimationFrame(function () {
            update(newCounter, svgArray);
          });
        }
      }, 2000 / svgArray.length);
    } catch (e) {
      console.log('stop loop');
    }
  }
  // eslint-disable-next-line prettier/prettier
  return (
    <>
      <div>SVGPreviewerPage</div>
      <canvas id="exCanvas" width="500px" height="500px" />
    </>
  );
};

export default SVGPreviewerPage;
