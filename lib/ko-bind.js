var ko = require("knockout-es5-option4");

/**
 * Apply knockout.js property bindings.
 * @param {object} obj
 */
function bind(obj) {
    var name, props = [];

    for (name in obj) {
        switch (typeof obj[name]) {
            case "function":
                // do nothing for functions
                break;

            default:
                obj[name] = obj[name];  // get own copy of prototype props
                props.push(name);
        }
    }

    ko.track(obj, props);
    return obj;
}

/** export utility function */
module.exports = bind;
