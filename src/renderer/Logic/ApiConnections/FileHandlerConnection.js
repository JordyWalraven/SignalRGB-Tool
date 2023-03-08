/* eslint-disable prettier/prettier */
/* eslint-disable radix */
/* eslint-disable import/prefer-default-export */

export function getDynamicPath(localPath) {
  const paths = window.fileReader.readdirSync(`${localPath}/VortxEngine/`);
  console.log(paths);
  let newestVersion = ['0', '0', '0'];
  paths.forEach((path) => {
    const temp = path.split('app-')[1];
    if (temp !== undefined) {
      const temp2 = temp.split('.');
      if (parseInt(temp2[0]) > parseInt(newestVersion[0])) {
        newestVersion = temp2;
      } else if (parseInt(temp2[0]) === parseInt(newestVersion[0])) {
        if (parseInt(temp2[1]) > parseInt(newestVersion[1])) {
          newestVersion = temp2;
        } else if (parseInt(temp2[1]) === parseInt(newestVersion[1])) {
          if (temp2[2] > newestVersion[2]) {
            newestVersion = temp2;
          }
        }
      }
    }
  });
  console.log(newestVersion);
  const returnpath = `${localPath}/VortxEngine/app-${newestVersion[0]}.${newestVersion[1]}.${newestVersion[2]}/Signal-x64/Effects/Dynamic/`;
  console.log(returnpath);
  return returnpath;
}

export function getLocalPath() {
  const response = window.apiConnection.send('getLocalAppdataPath');
  console.log(response);
  return response;
}

export async function getHtmlFiles(dynamicFolder) {
  const fileNames = window.fileReader.readdirSync(dynamicFolder);

  const htmlFiles = [];
  fileNames.forEach(async (element) => {
    if (element.includes('.html')) {
      const dataString = await window.fileReader.readFileSync(
        dynamicFolder + element,
        'utf8'
      );
      if (dataString === '') {
        return;
      }
      const tempName = dataString.split('<title>')[1].split('</title>')[0];

      const data = {
        name: tempName,
        html: dataString,
        path: dynamicFolder + element
      };
      htmlFiles.push(data);
    }
  });
  return htmlFiles;
}

export async function getGifImages(tenorString) {
  const response = await window.apiConnection.send('getGifImages', tenorString);
  console.log(response);
  return response;
}
