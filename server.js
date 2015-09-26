var http = require("http"),
    express = require("express"),
    app = express(),
    server;

app.use(express.static("static"));
app.use(express.static("build"));

server = http.createServer(app);

module.exports = server;
if (!module.parent) server.listen(4042);

