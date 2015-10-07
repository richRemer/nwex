var HostServer = require("./lib/host/host-server");

new HostServer().createHttpServer().listen(4042);
