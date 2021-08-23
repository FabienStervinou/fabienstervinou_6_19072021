export default class Router {

  constructor() {
    this.routes = [];
  }

  get(uri, callback) {
    // Verify if arguments are empty
    if (!uri || !callback) {
      throw new Error('uri or callback must be given')
    }

    // Verify uri type
    if (typeof uri !== "string") {
      throw new TypeError('typeof uri must be a string')
    } 

    // Verify callback type
    if (typeof callback !== "function") {
      throw new TypeError('typeof callback must be a function')
    }

    // Enable duplicates uri
    this.routes.forEach( route => {
      if (route.uri === uri) {
        throw new Error(`the uri ${route.uri} already exists`)
      }
    })

    const route = {
      uri,
      callback
    }

    this.routes.push(route);
  }


  init() {
    this.routes.some( route => {

      let regEx = new RegExp(`^${route.uri}$`);
      let path = window.location.pathname;

      if (path.match(regEx)) {
        let req = { path } // i'll also explain this code below
        return route.callback.call(this, req);
      }
    })
  }
}
