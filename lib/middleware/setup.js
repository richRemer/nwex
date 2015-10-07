var express = require("express"),
    render = require("./render"),
    redirect = require("./redirect");

/**
 * Create middleware to proceed if the host setup is incomplete.
 * @param {HostServer} host
 * @returns {function}
 */
function incomplete(host) {
    return function(req, res, next) {
        // assume incomplete for now
        next();
    }    
}

/**
 * Create setup UI middleware for a host.
 * @param {HostServer} host
 * @returns {function}
 */
function ui(host) {
    var ui = express.Router();

    ui.get("/", redirect("checklist"));
    ui.get("/checklist", render("setup/checklist"));

    return ui;
}

/** export middleware functions */
module.exports = {
    incomplete: incomplete,
    ui: ui
};
