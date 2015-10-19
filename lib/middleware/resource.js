/**
 * Create resource middleware for serving a singleton resource.
 * @param {object} resource
 */
function singleton(object) {
    return function(req, res, next) {
        res.writeHead(200, {"Content-Type": "application/json"});
        res.write(JSON.stringify(object));
        res.end();
    };
}

/** export middleware functions */
module.exports = {
    singleton: singleton
};
