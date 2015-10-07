var express = require("express"),
    home = require("./home"),
    auth = require("./auth"),
    authed = require("./authed"),
    render = require("./render");

/**
 * Create nwex application middleware.
 * @param {HostServer} host
 * @returns {function}
 */
function nwex(host) {
    var nwex = express.Router();

    nwex.use(auth(host.host + ":" + host.port, "/auth", home()));
    nwex.use(express.static("static"));
    nwex.use(express.static("build"));
    nwex.use("/src", authed("/auth/login"), express.static("."));
    nwex.get("/home", render("home"));

    return nwex;
}

/** export middleware function */
module.exports = nwex;
