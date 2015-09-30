/**
 * Create middleware to logout and continue to next middleware.
 * @returns {function}
 */
function logout() {
    return function(req, res, next) {
        req.logout();
        next();
    };
}

/** export middleware function */
module.exports = logout;
