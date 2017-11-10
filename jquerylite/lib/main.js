const DOMNodeCollection = require("./dom_node_collection.js");

const $l = function (selector) {
  if (selector instanceof Function) {
    document.addEventListener("DOMContentLoaded", selector);
  } else if(selector instanceof HTMLElement) {
    let newArr = [selector];
    return new DOMNodeCollection(newArr);
  } else {
    const elements = document.querySelectorAll(selector);
    return new DOMNodeCollection(elements);
  }
};

$l.extend = function (...objects) {
  let newObject = {};
  objects.forEach((object) => {
    let keys = Object.keys(object);
    keys.forEach((key) => {
      newObject[`${key}`] = object[`${key}`];
    });
  });
  return newObject;
};

$l.ajax = function (options) {
  let defaultObject = {
    url: "",
    type: 'GET',
    contentType: 'JSON',
    data: {},
    success (response) {console.log(response);},
    error (error) {alert(`${error}`);}
  };
  let xhrData = $l.extend(defaultObject, options);
  let xhr = new XMLHttpRequest();
  xhr.open(xhrData.type, xhrData.url);
  xhr.onload = function (e) {
    if (xhr.status === 200) {
      xhrData.success(xhr.response);
    } else {
      xhrData.error(xhr.response);
    }
  };
  return xhr.send(JSON.stringify(xhrData.data));
};

window.$l = $l;
window.DOMNodeCollection = DOMNodeCollection;
