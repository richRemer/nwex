/**
 * Server states.
 * @enum {string}
 * @readonly
 */
var ServerState = {
    PENDING: "pending",
    CONNECTING: "connecting",
    CONNECTED: "connected",
    STARTING: "starting",
    STARTED: "started"
};

/**
 * Server model.
 * @constructor
 * @param {object} [opts]
 * @param {string} [opts.host]
 * @param {number} [opts.port]
 */
function Server(opts) {
    opts = opts || {};
    
    /**
     * @name Server#host
     * @type {string}
     */
    this.host = opts.host || "localhost";

    /**
     * @name Server#port
     * @type {number}
     */
    this.port = opts.port || 4042;

    /**
     * @name Server#state
     * @type {ServerState}
     * @readony
     */
    this.state = ServerState.PENDING;

    /**
     * @name Server#connecting
     * @type {boolean}
     * @readony
     */
    this.connecting = false;

    /**
     * @name Server#connected
     * @type {boolean}
     * @readony
     */
    this.connected = false;

    /**
     * @name Server#starting
     * @type {boolean}
     * @readony
     */
    this.starting = false;

    /**
     * @name Server#started
     * @type {boolean}
     * @readony
     */
    this.started = false;

    /**
     * @name Server#pending
     * @type {boolean}
     * @readony
     */
    this.pending = true;

}

Server.prototype = Object.create(Object.prototype);
Server.prototype.constructor = Server;

/**
 * Change server state.
 * @param {ServerState} state
 */
Server.prototype.changeState = function(state) {
    switch (state) {
        case ServerState.PENDING:
            this.pending = true;
            this.connecting = this.connected = false;
            this.starting = this.started = false;
            break;

        case ServerState.STARTING:
            this.pending = false;
            this.connecting = this.connected = this.started = false;
            this.starting = true;
            break;

        case ServerState.STARTED:
            this.pending = false;
            this.connecting = this.connected = this.starting = false;
            this.started = true;
            break;

        case ServerState.CONNECTING:
            this.pending = false;
            this.connected = this.starting = this.started = false;
            this.connecting = true;
            break;

        case ServerState.CONNECTED:
            this.pending = false;
            this.connecting = this.starting = this.started = false;
            this.connected = true;
            break;

        default:
            return;
    }

    this.state = state;
};


/** export server decorated server model */
Server.ServerState = ServerState;
module.exports = Server;
