var path = require("path");

/**
 * Create middleware to redirect to a URL.
 * @param {string} url
 * @returns {function}
 */
function redirect(url) {
    return function(req, res, next) {
        var fullUrl = url[0] === "/" ? url : path.join(req.baseUrl, url);
        res.redirect(fullUrl);
    };
}

/** export middleware function */
module.exports = redirect;
