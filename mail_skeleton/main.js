const Router = require ("./router.js");

document.addEventListener("DOMContentLoaded", (docLoadEvent) => {
  let selected = document.querySelectorAll(".sidebar-nav li");
  let content = document.querySelector(".content");
  let router = new Router (content);
  router.start();
  selected.forEach((el) => {
    el.addEventListener("click", (e) => {
      let newLocation = e.target.innerText;
      newLocation = newLocation.toLowerCase();
      window.location.hash = newLocation;
    });
  });
});
