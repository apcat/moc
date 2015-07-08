/**
 * 通信最適化 Checker
 */
/* globals CryptoJS */

if (location.protocol === "https:") {
  location.protocol = "http:";
}

$(function () {
  var valid = $("#valid > span").text();

  function print(protocol) {
    return function () {
      var $field = $("#" + protocol + " > span").text(hash);

      if (this.status !== 200) {
        $field.text("Error = " + this.statusText);
        $field.addClass("error");
        return;
      }

      var bytes = new Uint8Array(this.response);
      var hash = shasum(bytes);
      var url = createURL(bytes);

      $("#" + protocol + "-img").attr("src", url);

      $field.text(hash);
      if (hash === valid) {
        $field.addClass("valid");
      } else {
        $field.addClass("invalid");
      }
    };
  }

  ajax("http://" + location.host + location.pathname + "photo.jpg", print("http"));
  ajax("https://" + location.host + location.pathname + "photo.jpg", print("https"));
});

function ajax(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("get", url, true);
  xhr.responseType = "arraybuffer";
  xhr.addEventListener("load", callback);
  xhr.addEventListener("error", callback);
  xhr.send();
}

function shasum(bytes) {
  var byte_string = "";
  [].forEach.call(bytes, function (byte) {
    byte_string += String.fromCharCode(byte);
  });
  var base64_str = btoa(byte_string);
  
  var binary = CryptoJS.enc.Base64.parse(base64_str);
  var hash = CryptoJS.SHA1(binary);
  return hash.toString();
}

function createURL(bytes) {
  var blob = new Blob([bytes], {type: "image/png"});
  return URL.createObjectURL(blob);
}
