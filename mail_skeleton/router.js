class Router {
  constructor (node, routes) {
    this.node = node;
    this.routes = routes;
  }
  start () {
    this.render();
    window.addEventListener('hashchange', (e) => {
      this.render();
    });
  }
  activeRoute () {
    const newRoute = window.location.hash.slice(1);
    return this.routes[`${newRoute}`];
  }
  render () {
    this.node.innerHTML = '';
    let component = this.activeRoute();
    if (!component) {
      this.node.innerHTML = "";
    } else {
      this.node.innerHTML = "";
      this.node.appendChild(component.render());
    }
  }

}


module.exports = Router;
