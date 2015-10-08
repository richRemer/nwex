/**
 * Create resource middleware for serving a singleton resource.
 * @param {object} resource
 */
function singleton(object) {
    return function(req, res, next) {
        res.json(object);
    };
}

/** export middleware functions */
module.exports = {
    singleton: singleton
};
