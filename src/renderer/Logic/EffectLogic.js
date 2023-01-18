/* eslint-disable prefer-template */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-plusplus */
/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable class-methods-use-this */

import CanvasService from "./CanvasService";

class EffectLogic{

    modifyHtml(fileObject) {
      let content = fileObject.html;
// eslint-disable-next-line prettier/prettier
      let head = content.split("</head>")[0].replace(`\\`, "");
      let metaProp = head.split("property");
      let vars = [];
      let metaDefaults = head.split("default");
      let defaultValues = [];
      let types = head.split("type");
      let typeValues = [];
      for (let i = 0; i < metaProp.length; i++) {
        if (i !== 0) vars.push(metaProp[i].split(`="`)[1].split('"')[0]);
      }
      for (let index = 0; index < metaDefaults.length; index++) {
        if (index !== 0)
          defaultValues.push(metaDefaults[index].split(`="`)[1].split('"')[0]);
      }
      for (let index = 0; index < types.length; index++) {
        if (index !== 0)
          typeValues.push(types[index].split(`="`)[1].split('"')[0]);
      }

      let num = content.split("<script>")[0].length + 8;
      let script = content.substring(0, num);
      vars.forEach((element, i) => {
        if (typeValues[i] === "number") {
          script += `var ${element} =  ${defaultValues[i]}\n `;
        } else {
          script += `var ${element} =  "${defaultValues[i]}"\n `;
        }
      });
      let html = script + content.substring(num, content.length);
      fileObject.html = html;
      return fileObject;
    }
}

export default EffectLogic;
