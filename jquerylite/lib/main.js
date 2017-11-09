const DOMNodeCollection = require("./dom_node_collection.js");

const $l = function (selector) {
  if(selector instanceof HTMLElement) {
    let newArr = [selector];
    return new DOMNodeCollection(newArr);
  } else {
    const elements = document.querySelectorAll(selector);
    return new DOMNodeCollection(elements);
  }
};

window.$l = $l;
window.DOMNodeCollection = DOMNodeCollection;
