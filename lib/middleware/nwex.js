var express = require("express"),
    setup = require("./setup"),
    home = require("./home"),
    auth = require("./auth"),
    authed = require("./authed"),
    render = require("./render"),
    redirect = require("./redirect"),
    resource = require("./resource");

/**
 * Create nwex application middleware.
 * @param {HostServer} host
 * @returns {function}
 */
function nwex(host) {
    var nwex = express.Router();

    nwex.use(express.static("static"));
    nwex.use(express.static("build"));

    nwex.use("/host", resource.singleton(host));
    nwex.use("/setup", setup(host));
    
    nwex.use(setup.incomplete(host), redirect("/setup"));
    nwex.use(auth(host.host + ":" + host.port, "/auth", home()));

    nwex.use("/src", authed("/auth/login"), express.static("."));
    nwex.get("/home", render("home"));

    return nwex;
}

/** export middleware function */
module.exports = nwex;
