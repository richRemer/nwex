var ko = require("knockout-es5-option4"),
    TerminalServer = require("../lib/terminal/terminal-server");

document.addEventListener("DOMContentLoaded", function() {
    var server = new TerminalServer(),
        checklist = {};

    server.sync();

    checklist.steps = [];
    checklist.complete = false;

    ko.applyBindings(checklist, document.getElementById("setup"));
});
