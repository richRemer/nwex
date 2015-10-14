var prop = require("propertize");

/**
 * Setup properties to emit when changed.
 * @param {object} obj
 * @returns {object}
 */
function emit(obj) {
    var name;

    Object.keys(obj).forEach(function(name) {
        switch (typeof obj[name]) {
            case "boolean":
                // setup booleans to emit only when set to true
                prop.triggered(obj, name, function(is, was) {
                    if (is && !was) obj.emit(name);
                });
                prop.enumerable(obj, name);
                break;

            case "function":
                // do nothing for functions
                break;

            default:
                // setup emit on change
                prop.triggered(obj, name, function(is, was) {
                    if (is !== was) obj.emit(name, was);
                });
                prop.enumerable(obj, name);
        }
    });

    return obj;
}

/** export utility functions */
module.exports = {
    emit: emit
};
