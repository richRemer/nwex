var browser = require("./lib/nwex-browser-model"),
    NwexServerBase = require("./lib/nwex-server");

document.addEventListener("DOMContentLoaded", function() {
    var NwexServer = browser(NwexServerBase, ko),
        server = new NwexServer();

    server.on("ready", function() {
        window.location = "http://" + server.host + ":" + server.port + "/";
    });

    ko.applyBindings(server, document.getElementById("server"));
});
