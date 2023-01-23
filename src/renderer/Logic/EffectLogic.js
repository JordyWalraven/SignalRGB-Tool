/* eslint-disable no-param-reassign */
/* eslint-disable no-nested-ternary */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-cond-assign */
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

    getMeters(html) {
        const properties = [];
        const metaTagRegex = /<meta([\s\S]*?)>/g;
        let match;

        while ((match = metaTagRegex.exec(html)) !== null) {
          const property = {};

          // Extract the attributes and their values from the matched tag
          const attrRegex = /(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/g;
          let attrMatch;
          while ((attrMatch = attrRegex.exec(match[1])) !== null) {
            property[attrMatch[1]] = attrMatch[2];
          }

          // Extract the resolution tags and their attributes
          const resolutionRegex = /<resolution([\s\S]*?)>/g;
          let resolutionMatch;
          property.resolutions = [];
          while ((resolutionMatch = resolutionRegex.exec(match[1])) !== null) {
            const resolution = {};
            const resolutionAttrRegex = /(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/g;
            let resolutionAttrMatch;
            while ((resolutionAttrMatch = resolutionAttrRegex.exec(resolutionMatch[1])) !== null) {
              resolution[resolutionAttrMatch[1]] = resolutionAttrMatch[2];
            }
            property.resolutions.push(resolution);
          }

          properties.push(property);
        }
        return properties;
    }

    RGBToHSL(r, g, b) {
      r /= 255;
      g /= 255;
      b /= 255;
      const l = Math.max(r, g, b);
      const s = l - Math.min(r, g, b);
      const h = s
        ? l === r
          ? (g - b) / s
          : l === g
          ? 2 + (b - r) / s
          : 4 + (r - g) / s
        : 0;
      return [
        60 * h < 0 ? 60 * h + 360 : 60 * h,
        100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
        (100 * (2 * l - s)) / 2,
      ];
    };


}

export default EffectLogic;
