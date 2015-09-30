var ko = require("knockout-es5-option4"),
    terminal = require("./lib/terminal"),
    host = require("./lib/host");

document.addEventListener("DOMContentLoaded", function() {
    var server = new terminal.Server();
    
    server.start = function() {
        var hostServer,
            opts = {};

        opts.host = this.host;
        opts.port = this.port;
        hostServer = new host.Server(opts);
        hostServer.on("state", function() {
console.log("host state changed");
            server.changeState(this.state);
        });
        hostServer.start();
    };

    ko.applyBindings(server, document.getElementById("server"));
});
