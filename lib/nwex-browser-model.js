/**
 * Create a browser model from a base model.
 * @param {function} base
 * @param {object} ko
 * @returns {function}
 */
function browser(base, ko) {
    function BrowserModel() {
        var model = this,
            proto = base.prototype,
            props;

        base.call(this);

        // identify properties by filtering prototype for non-function values
        props = Object.getOwnPropertyNames(proto).filter(function(prop) {
            return typeof proto[prop] !== "function";
        });

        // get 'own' values on this object
        props.forEach(function(prop) {model[prop] = model[prop];});

        // apply kockout tracking to properties
        ko.track(this, props.filter(function(prop) {
            return typeof proto[prop] !== "function";
        }));
    }

    BrowserModel.prototype = Object.create(base.prototype);
    BrowserModel.constructor = BrowserModel;

    return BrowserModel;
}

/** export browser function */
module.exports = browser;
