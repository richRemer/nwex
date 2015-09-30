var prop = require("propertize");

prop.derived(module.exports, "Server", function() {
    return require("./terminal/terminal-server");
});

