var http = require("http"),
    express = require("express"),
    server;

/**
 * Create application server.
 */
function createServer() {
    var app = express();

    app.use(express.static("static"));
    app.use(express.static("build"));

    return http.createServer(app);
}

module.exports = createServer;
if (!module.parent) createServer().listen(4042);

