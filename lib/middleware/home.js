/**
 * Create middleware to redirect to the home page.
 * @returns {function}
 */
function home() {
    return function(req, res, next) {
        res.redirect("/home");
    };
}

/** export middleware function */
module.exports = home;
