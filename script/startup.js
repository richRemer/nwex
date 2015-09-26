var Application = require("../lib/nwex-application"),
    app = new Application();

app.on("started", console.log.bind(console, "started"));
app.emit("started");
