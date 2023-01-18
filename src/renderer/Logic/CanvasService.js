/* eslint-disable prettier/prettier */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable class-methods-use-this */
class CanvasService {
  getHtmlText(html, callback) {
    if (html !== "") {
      // eslint-disable-next-line no-var
      var r = new FileReader();
       (r.onload = function (e) {
        var contents = e.target.result;
        callback(contents);
      });
      r.readAsText(html);
    }
  }
}

export default CanvasService;
