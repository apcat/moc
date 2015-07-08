/**
 * 通信最適化 Checker
 */
/* globals CryptoJS */

$(function () {
  var valid = $("#valid > span").text();

  ajax("http://" + location.host + "/photo.jpg", function () {
    var hash = shasum(this.response);
    $("#http > span").text(hash);
  });

  ajax("https://" + location.host + "/photo.jpg", function () {
    var hash = shasum(this.response);
    $("#https > span").text(hash);
  });
});

function ajax(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("get", url, true);
  xhr.responseType = "arraybuffer";
  xhr.addEventListener("load", callback);
  xhr.send();
}

function shasum(buffer) {
  var bytes = new Uint8Array(buffer);
  var byte_string = "";
  [].forEach.call(bytes, function (byte) {
    byte_string += String.fromCharCode(byte);
  });
  var base64_str = btoa(byte_string);
  
  var binary = CryptoJS.enc.Base64.parse(base64_str);
  var hash = CryptoJS.SHA1(binary);
  return hash.toString();
}
