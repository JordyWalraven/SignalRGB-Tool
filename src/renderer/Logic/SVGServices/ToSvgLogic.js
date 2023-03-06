/* eslint-disable no-plusplus */
/* eslint-disable prettier/prettier */
/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line prettier/prettier

function sumColor(color) {
  return color[0] + color[1] + color[2];
}

function checkBorderingColors(ctx, x, y, backColor) {
  const borderingColors = [];
  borderingColors.push(ctx.getImageData(x + 1, y, 1, 1).data);
  borderingColors.push(ctx.getImageData(x - 1, y, 1, 1).data);
  borderingColors.push(ctx.getImageData(x, y + 1, 1, 1).data);
  borderingColors.push(ctx.getImageData(x, y - 1, 1, 1).data);
  for (let index = 0; index < borderingColors.length; index++) {
    if (Math.abs(sumColor(borderingColors[index]) - sumColor(backColor)) === 0) {
      return true;
    }
  }
  return false;
}

export async function breakDownFrame(frame) {
  // eslint-disable-next-line prettier/prettier

  // eslint-disable-next-line prefer-const

  const canvas = document.createElement('canvas');
  canvas.width = frame.width;
  canvas.height = frame.height;
  console.log(frame.width)
  const ctx = canvas.getContext('2d');
  ctx.drawImage(frame, 0, 0, frame.width, frame.height);

  const borderPoints = [];
  const cornerColor = ctx.getImageData(0, 0, 1, 1).data;

  const corner2Color = ctx.getImageData(0, canvas.height - 1, 1, 1).data;
  const corner3Color = ctx.getImageData(canvas.width - 1, 0, 1, 1).data;
  const corner4Color = ctx.getImageData(
    canvas.width - 1,
    canvas.height - 1,
    1,
    1
  ).data;
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
      const imageData = ctx.getImageData(x, y, 1, 1);
      const color = imageData.data;
      if (Math.abs(sumColor(color) - sumColor(cornerColor)) > 10) {
        if (checkBorderingColors(ctx, x, y, cornerColor)) {
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
  console.log(borderPoints.length);

  return borderPoints;
}
