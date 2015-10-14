var path = require("path");

/**
 * Create middleware to redirect to a URL.
 * @param {string} url
 * @returns {function}
 */
function redirect(url) {
    return function(req, res, next) {
        var fullUrl = url;

        fullUrl = fullUrl[0] === "/"
            ? fullUrl
            : path.join(req.baseUrl, fullUrl);

        res.redirect(fullUrl);
    };
}

/** export middleware function */
module.exports = redirect;
