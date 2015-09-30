var host = require("./lib/host/host-server");

new host.Server().createHttpServer().listen(4042);

