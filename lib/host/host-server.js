var EventEmitter = require("events").EventEmitter,
    prop = require("propertize"),
    http = require("http"),
    express = require("express"),
    model = require("../host-model"),
    Server = require("../server"),
    ServerState = Server.ServerState,
    home = require("../middleware/home"),
    auth = require("../middleware/auth"),
    authed = require("../middleware/authed"),
    render = require("../middleware/render");

/**
 * Server model for host.
 * @augments {Server}
 * @param {object} [opts]
 */
function HostServer(opts) {
    Server.call(this, opts);
    EventEmitter.call(this);
    model.emit(this);
}

HostServer.prototype = Object.create(Server.prototype);
HostServer.prototype.constructor = HostServer;

model.emitter(HostServer.prototype);

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
 * Create HTTP server.
 * @name HostServer#createHttpServer
 * @method
 * @returns {http.Server}
 */
HostServer.prototype.createHttpServer = function() {
    var app = express(),
        host = this.host + ":" + this.port;

    app.set("views", "./view");
    app.set("view engine", "jade");

    app.use(auth(host, "/auth", home()));
    app.use(express.static("static"));
    app.use(express.static("build"));
    app.use("/src", authed("/auth/login"), express.static("."));
    app.get("/home", render("home"));

    return http.createServer(app);
};
 

/** export host server model */
module.exports = HostServer;
