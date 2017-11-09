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
