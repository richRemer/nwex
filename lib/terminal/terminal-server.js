var EventEmitter = require("events").EventEmitter,
    prop = require("propertize"),
    http = require("http"),
    model = require("../terminal-model"),
    Server = require("../server"),
    ServerState = Server.ServerState;

/**
 * Server model for terminal.
 * @augments {Server}
 */
function TerminalServer() {
    Server.call(this);
    model.bind(this);
}

TerminalServer.prototype = Object.create(Server.prototype);
TerminalServer.prototype.constructor = TerminalServer;

/**
 * Connect to server.
 * @name Server#connect
 * @method
 */
TerminalServer.prototype.connect = function() {
    var server = this,
        url = "http://" + this.host + ":" + this.port + "/";

    if (this.state !== ServerState.PENDING) return;
    this.changeState(ServerState.CONNECTING);

    http.get(url, function(res) {
        server.changeState(ServerState.CONNECTED);
    }).on("error", function(err) {
        server.changeState(ServerState.PENDING);
    });
};

/** export terminal server model */
module.exports = TerminalServer;
