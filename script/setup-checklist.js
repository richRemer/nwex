var ko = require("knockout-es5-option4"),
    SetupServer = require("../lib/setup/setup-server");

document.addEventListener("DOMContentLoaded", function() {
    var server = new SetupServer();

    server.sync(true);

    ko.applyBindings(server, document.getElementById("setup"));
});
