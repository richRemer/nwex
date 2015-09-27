var ko = require("knockout-es5"),
    browser = require("./lib/nwex-browser-model"),
    NwexServerBase = require("./lib/nwex-server");

document.addEventListener("DOMContentLoaded", function() {
    var NwexServer = browser(NwexServerBase, ko);
    ko.applyBindings(new NwexServer(), document.getElementById("server"));
});
