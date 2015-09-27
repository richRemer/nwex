var ko = require("knockout-es5"),
    NwexServer = require("./lib/nwex-server");

document.addEventListener("DOMContentLoaded", function() {
    ko.applyBindings(new NwexServer(), document.getElementById("server"));
});
