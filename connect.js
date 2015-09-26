var http = require("http");
 
function redirect() {
    if (window.location.href.indexOf("localhost") < 0) {
        window.location = "http://localhost:4042/";
    }
}

http.get({host: "localhost", port: 4042}, redirect)
.on("error", function(err) {
    require("./server").listen(4042, redirect);    
});
