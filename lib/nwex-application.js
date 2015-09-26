var EventEmitter = require("events").EventEmitter;

/**
 * Example nwex application class.
 * @constructor
 */
function NwexApplication() {
    EventEmitter.call(this);
}

NwexApplication.prototype = Object.create(EventEmitter.prototype);
NwexApplication.prototype.constructor = NwexApplication;

/** export application class */
module.exports = NwexApplication;
