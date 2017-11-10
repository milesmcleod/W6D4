/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1);

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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(elementsArray) {
    this.elements = elementsArray;
  }

  html(string) {
    if (string) {
      this.elements.forEach(el => {
        el.innerHTML = string;
      });
    } else {
      return this.elements[0].innerHTML;
    }
  }

  length () {
    return this.elements.length;
  }

  forEach (callback) {
    for(let i = 0; i < this.elements.length; i++) {
      callback(this.elements[i]);
    }
  }

  empty () {
    this.elements.forEach(el => {
      el.innerHTML = '';
    });
  }

  append (element) {
    if (element instanceof DOMNodeCollection) {
      element.forEach((argEl) => {
        this.forEach((el) => {
          el.innerHTML += argEl.outerHTML;
        });
      });
    } else {
      this.forEach((el) => {
        el.innerHTML += element;
      });
    }
  }

  attr () {
    return this.elements[0].attributes;
  }

  addClass (string) {
    this.forEach((el) => {
      el.classList.add(string);
    });
  }

  removeClass (string) {
    this.forEach((el) => {
      let classes = el.className;
      el.classList.remove(string);
    });
  }

  children () {
    let newArr = [];
    this.forEach((el) => {
      let kids = el.children;
      for(let i = 0; i < kids.length; i++) {
        newArr.push(kids[i]);
      }
    });
    console.log(newArr);
    return new DOMNodeCollection (newArr);
  }

  parent () {
    let newArr = [];
    this.forEach((el) => {
      newArr.push(el.parentElement);
    });
    return new DOMNodeCollection (newArr);
  }

  find (string) {
    let newArr = [];
    this.forEach((el) => {
      let tempArr = el.querySelectorAll(string);
      tempArr.forEach((child) => {
        newArr.push(child);
      });
    });
    return new DOMNodeCollection (newArr);
  }

  remove () {
    this.forEach((el) => {
      el.parentNode.removeChild(el);
    });
  }

  on (type, fn) {
    this.forEach((el) => {
      el.addEventListener(type, fn);
    });
  }

  off (type, fn) {
    this.forEach((el) => {
      el.removeEventListener(type, fn);
    });
  }
}

module.exports = DOMNodeCollection;


/***/ })
/******/ ]);