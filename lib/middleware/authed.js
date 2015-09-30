/**
 * Create middleware to redirect if not authenticated.
 * @param {string} url
 * @returns {function}
 */
function authed(url) {
    return function(req, res, next) {
        if (req.isAuthenticated && req.isAuthenticated()) next();
        else res.redirect(url);
    };
}

/** export middleware function */
module.exports = authed;
