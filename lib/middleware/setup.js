var express = require("express"),
    render = require("./render"),
    redirect = require("./redirect"),
    TemporaryStorage = require("../temporary-storage");

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
 * Create setup middleware for a host.
 * @param {HostServer} host
 * @returns {function}
 */
function middleware(host) {
    var router = express.Router();

    router.get("/", redirect("checklist"));
    router.get("/checklist", render("setup/checklist"));
    
    router.post("/temporary-storage", function(req, res) {
        host.configureStorage(new TemporaryStorage());
        res.writeHead(204);
    });
    
    router.post("/google-oauth2", function(req, res) {
        
    });

    return router;
}

/** export middleware functions */
module.exports = middleware;
module.exports.incomplete = incomplete;

