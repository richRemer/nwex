var EventEmitter = require("events").EventEmitter,
    prop = require("propertize"),
    http = require("http"),
    kobind = require("../ko-bind"),
    synced = require("../synced"),
    Server = require("../server"),
    ServerState = Server.ServerState;

/**
 * Server model for terminal.
 * @augments {Server}
 */
function TerminalServer() {
    Server.call(this);
    kobind(this);
    synced(this);
}

TerminalServer.ServerState = ServerState;
TerminalServer.prototype = Object.create(Server.prototype);
TerminalServer.prototype.constructor = TerminalServer;

/**
 * Connect to server.
 * @name Server#connect
 * @method
 */
TerminalServer.prototype.connect = function() {
    var server = this;

    if (this.state !== ServerState.PENDING) return;
    this.changeState(ServerState.CONNECTING);

    http.get(this.url(), function(res) {
        server.changeState(ServerState.CONNECTED);
    }).on("error", function(err) {
        server.changeState(ServerState.PENDING);
    });
};

/**
 * Return server URL.
 * @returns {string}
 */
TerminalServer.prototype.url = function() {
    return "http://" + this.host + ":" + this.port + "/host";
};

/** export terminal server model */
module.exports = TerminalServer;
