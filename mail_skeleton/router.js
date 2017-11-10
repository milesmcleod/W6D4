class Router {
  constructor (node) {
    this.node = node;
  }
  start () {
    this.render();
    window.addEventListener('hashchange', (e) => {
      this.render();
      console.log('starting');
    });
  }
  activeRoute () {
    console.log('routing');
    return window.location.hash.slice(1);
  }
  render () {
    console.log('rendering');
    this.node.innerHTML = '';
    let routeName = this.activeRoute();
    var p = document.createElement("P");
    p.innerHTML = routeName;
    this.node.appendChild(p);
  }

}


module.exports = Router;
