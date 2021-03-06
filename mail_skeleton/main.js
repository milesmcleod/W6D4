const Router = require ("./router.js");
const Inbox = require ("./Inbox.js");
const Sent = require ("./Sent.js");
const Compose = require("./Compose.js");

const routes = {
  inbox: Inbox,
  sent: Sent,
  compose: Compose
};

document.addEventListener("DOMContentLoaded", (docLoadEvent) => {
  let selected = document.querySelectorAll(".sidebar-nav li");
  let content = document.querySelector(".content");
  let router = new Router (content, routes);
  router.start();
  window.location.hash = 'inbox';
  selected.forEach((el) => {
    el.addEventListener("click", (e) => {
      let newLocation = e.target.innerText;
      newLocation = newLocation.toLowerCase();
      window.location.hash = newLocation;
    });
  });
});
