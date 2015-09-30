var EventEmitter = require("events").EventEmitter,
    prop = require("propertize");

/**
 * Mixin EventEmitter.
 * @param {object} proto
 * @returns {object}
 */
function emitter(proto) {
    // mixin EventEmitter
    for (name in EventEmitter.prototype) {
        prop.hidden(proto, name, EventEmitter.prototype[name]);
    }

    return proto;
}

/**
 * Setup properties to emit when changed.
 * @param {object} obj
 * @returns {object}
 */
function emit(obj) {
    var name;

    for (name in obj) {
        switch (typeof obj[name]) {
            case "boolean":
                // setup booleans to emit only when set to true
                prop.triggered(obj, name, function(is, was) {
                    if (is && !was) obj.emit(name);
                });
                break;

            case "function":
                // do nothing for functions
                break;

            default:
                // setup emit on change
                prop.triggered(obj, name, function(is, was) {
                    if (is !== was) obj.emit(name, was);
                });
        }
    }

console.log(JSON.stringify(obj));
    return obj;
}

/** export utility functions */
module.exports = {
    emitter: emitter,
    emit: emit
};
