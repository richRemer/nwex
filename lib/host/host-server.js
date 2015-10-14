var EventEmitter = require("events").EventEmitter,
    prop = require("propertize"),
    mixin = require("objektify").mixin,
    http = require("http"),
    express = require("express"),
    model = require("../host-model"),
    nwex = require("../middleware/nwex"),
    home = require("../middleware/home"),
    auth = require("../middleware/auth"),
    authed = require("../middleware/authed"),
    render = require("../middleware/render"),
    Server = require("../server"),
    ServerState = Server.ServerState;

/**
 * Server model for host.
 * @augments {Server}
 * @param {object} [opts]
 */
function HostServer(opts) {
    Server.call(this, opts);
    EventEmitter.call(this);
    model.emit(this);

    prop.hidden(this, "httpServer");
    prop.hidden(this, "domain");
    prop.hidden(this, "_events");
    prop.hidden(this, "_maxListeners");
}

HostServer.prototype = Object.create(Server.prototype);
HostServer.prototype.constructor = HostServer;
mixin(HostServer.prototype, EventEmitter.prototype);

/**
 * Start a new server.
 * @name HostServer#start
 * @method
 */
HostServer.prototype.start = function() {
    var server = this;

    if (this.state !== ServerState.PENDING) return;
    this.changeState(ServerState.STARTING);

    this.httpServer = this.createHttpServer();
    this.httpServer.listen(this.port, function() {
        server.changeState(ServerState.STARTED);
    });
};

/**
 * Create Express application for this host.
 * @name HostServer#createApplication
 * @method
 * @returns {function}
 */
HostServer.prototype.createApplication = function() {
    var app = express();

    app.set("views", "./view");
    app.set("view engine", "jade");
    app.use(this.createMiddleware());

    return app;
};

/**
 * Create Connect middleware for host.
 * @name HostServer#createMiddleware
 * @method
 * @returns {function}
 */
HostServer.prototype.createMiddleware = function() {
    return nwex(this);
};

/**
 * Create HTTP server for this host.
 * @name HostServer#createHttpServer
 * @method
 * @returns {http.Server}
 */
HostServer.prototype.createHttpServer = function() {
    return http.createServer(this.createApplication());
};
 

/** export host server model */
module.exports = HostServer;
