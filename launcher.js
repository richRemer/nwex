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
            server.changeState(this.state);
        });

        hostServer.on("started", function() {
            var url = "http://" + this.host + ":" + this.port + "/";
            window.location = url;
        });

        hostServer.start();
    };

    ko.applyBindings(server, document.getElementById("server"));
});
