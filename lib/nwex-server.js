var EventEmitter = require("events").EventEmitter,
    http = require("http"),
    createServer = require("../server");

/**
 * Nwex server states.
 * @enum {string}
 * @readonly
 */
var NwexServerState = {
        PENDING: "pending",
        CONNECTING: "connecting",
        CONNECTED: "connected",
        STARTING: "starting",
        STARTED: "started"
    };

/**
 * Nwex server class.
 * @constructor
 * @param {object} [opts]
 * @param {string} [opts.host]
 * @param {number} [opts.port]
 */
function NwexServer() {
    EventEmitter.call(this);
}

NwexServer.prototype = Object.create(EventEmitter.prototype);
NwexServer.prototype.constructor = NwexServer;

/**
 * Connect to server.
 */
NwexServer.prototype.connect = function() {
    var server = this,
        url = "http://" + this.host + ":" + this.port + "/";

    if (this.state !== NwexServerState.PENDING) return;
    this.changeState(NwexServerState.CONNECTING);

    http.get(url, function(res) {
        server.changeState(NwesServerState.CONNECTED);
    }).on("error", function(err) {
        server.changeState(NwexServerState.PENDING);
    });
};

/**
 * Start a new server.
 */
NwexServer.prototype.start = function() {
    var server = this,
        httpServer;

    if (this.state !== NwexServerState.PENDING) return;
    this.changeState(NwexServerState.STARTING);

    this.httpServer = createServer();
    this.httpServer.listen(this.port, function() {
        server.changeState(NwexServerState.STARTED);
    });
};

/**
 * Change server state.
 * @param {NwexServerState} state
 */
NwexServer.prototype.changeState = function(state) {
    switch (state) {
        case NwexServerState.PENDING:
            this.pending = true;
            this.connecting = this.connected = false;
            this.starting = this.started = false;
            break;

        case NwexServerState.STARTING:
            this.pending = false;
            this.connecting = this.connected = this.started = false;
            this.starting = true;
            break;

        case NwexServerState.STARTED:
            this.pending = false;
            this.connecting = this.connected = this.starting = false;
            this.started = true;
            break;

        case NwexServerState.CONNECTING:
            this.pending = false;
            this.connected = this.starting = this.started = false;
            this.connecting = true;
            break;

        case NwexServerState.CONNECTED:
            this.pending = false;
            this.connecting = this.starting = this.started = false;
            this.connected = true;
            break;

        default:
            return false;
    }

    this.state = state;
};

/**
 * @name NwexServer#host
 * @type {string}
 */
NwexServer.prototype.host = "localhost";

/**
 * @name NwexServer#port
 * @type {number}
 */
NwexServer.prototype.port = 4042;

/**
 * @name NwexServer#state
 * @type {NwexServerState}
 */
NwexServer.prototype.state = NwexServerState.PENDING;

/**
 * @name NwexServer#connecting
 * @type {boolean}
 */
NwexServer.prototype.connecting = false;

/**
 * @name NwexServer#connected
 * @type {boolean}
 */
NwexServer.prototype.connected = false;

/**
 * @name NwexServer#starting
 * @type {boolean}
 */
NwexServer.prototype.starting = false;

/**
 * @name NwexServer#started
 * @type {boolean}
 */
NwexServer.prototype.started = false;

/**
 * @name NwexServer#pending
 * @type {boolean}
 */
NwexServer.prototype.pending = true;

/** export server class */
module.exports = NwexServer;
