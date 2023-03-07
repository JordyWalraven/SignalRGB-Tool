/* eslint-disable no-empty */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-plusplus */
/* eslint-disable prettier/prettier */
/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line prettier/prettier

function sumColor(color) {
  return color[0] + color[1] + color[2];
}

function checkBorderingColors(ctx, x, y, width, totalData, backColor) {
  function getDataForXY(xInput, yInput) {
    const index = (xInput + yInput * width) * 4;
    return totalData.slice(index, index + 4);
  }
  const borderingColors = [];
  borderingColors.push(getDataForXY(x + 1, y));
  borderingColors.push(getDataForXY(x - 1, y));
  borderingColors.push(getDataForXY(x, y + 1));
  borderingColors.push(getDataForXY(x, y - 1));
  for (let index = 0; index < borderingColors.length; index++) {
    if (
      Math.abs(sumColor(borderingColors[index]) - sumColor(backColor)) === 0
    ) {
      return true;
    }
  }
  return false;
}

export function breakDownFrame(frame, width, height, canvas) {
  // eslint-disable-next-line prettier/prettier

  // eslint-disable-next-line prefer-const

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  ctx.beginPath();
  ctx.fillStyle = 'green';
  ctx.fillRect(0, 0, width, height);
  ctx.beginPath();
  ctx.drawImage(frame, 0, 0);

  const borderPoints = [];
  const totalData = ctx.getImageData(0, 0, width, height).data;

  function getDataForXY(x, y) {
    const index = (x + y * width) * 4;
    return totalData.slice(index, index + 4);
  }

  const cornerColor = getDataForXY(0, 0);
  const corner2Color = getDataForXY(0, height - 1);
  const corner3Color = getDataForXY(width - 1, 0);
  const corner4Color = getDataForXY(width - 1, height - 1);
  let cornersMatch = false;
  let cornerCounter = 0;
  for (let index = 0; index < 4; index++) {
    if (
      cornerColor[index] === corner2Color[index] &&
      cornerColor[index] === corner3Color[index] &&
      cornerColor[index] === corner4Color[index]
    ) {
      cornerCounter++;
    } else {
      cornersMatch = false;
      break;
    }
  }
  if (cornerCounter === 4) {
    cornersMatch = true;
  }

  for (let x = 0; x < canvas.width; x++) {
    for (let y = 0; y < canvas.height; y++) {
      const color = getDataForXY(x, y);
      if (Math.abs(sumColor(color) - sumColor(cornerColor)) > 10) {
        if (checkBorderingColors(ctx, x, y, width, totalData, cornerColor)) {
          if (borderPoints.indexOf([x, y]) === -1) borderPoints.push([x, y]);
        }
      }
    }
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let index = 0; index < borderPoints.length; index++) {
    ctx.beginPath();
    ctx.arc(borderPoints[index][0], borderPoints[index][1], 1, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(frame, 0, 0);
  return borderPoints;
}

export function indexArray(inputArray) {
  const newTotalArray = [];
  let smallestIndex = 0;
  const allFramePoints = inputArray;

  for (let frame = 0; frame < allFramePoints.length; frame++) {
    let smallestY = 0;
    for (
      let smallYCounter = 0;
      smallYCounter < allFramePoints[frame].length;
      smallYCounter++
    ) {
      console.log(allFramePoints[frame][smallYCounter]);
      if (allFramePoints[frame][smallYCounter][1] > smallestY) {
        smallestY = allFramePoints[frame][smallYCounter][1];
        smallestIndex = smallYCounter;
      }
    }

    const oldArray = allFramePoints[frame];
    const newArray = [];
    newArray.push(oldArray[smallestIndex]);
    let lastIndex = smallestIndex;
    while (oldArray.length > 1) {
      let closestDistance = 100000;
      let closestIndex = 0;
      for (let index = 0; index < oldArray.length; index++) {
        if (index !== lastIndex) {
          try {
            const x = oldArray[index][0] - oldArray[lastIndex][0];
            const y = oldArray[index][1] - oldArray[lastIndex][1];

            const distance = Math.sqrt(x * x + y * y);
            if (distance < closestDistance) {
              closestDistance = distance;
              closestIndex = index;
            }
          } catch {}
        }
      }
      if (closestDistance < 30) {
        console.log(closestIndex);
        newArray.push(oldArray[closestIndex]);
        const ref = oldArray[closestIndex];
        oldArray.splice(lastIndex, 1);
        lastIndex = oldArray.indexOf(ref);
      } else {
        break;
      }
    }
    newTotalArray.push(newArray);
  }

  return newTotalArray;
}
