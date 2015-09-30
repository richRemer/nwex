var Passport = require("passport").Passport,
    GoogleStrategy = require("passport-google").Strategy,
    express = require("express"),
    path = require("path"),
    logout = require("./logout");

/**
 * Create Google Passport strategy.
 * @param {string} host
 * @param {string} authUrl
 * @returns {GoogleStrategy}
 */
function google(host, authUrl) {
    var realm = "http://" + host + "/",
        returnUrl = path.join(realm, authUrl);

    function success(identifier, profile, done) {
        profile.identifier = identifier;
        done(null, profile);
    }

    return new GoogleStrategy({realm: realm, returnURL: returnUrl}, success);
}

/**
 * Create middleware to authenticate users.
 * @param {string} host
 * @param {string} authUrl
 * @param {function} route
 * @returns {function}
 */
function auth(host, authUrl, route) {
    var router = express.Router(),
        passport = new Passport(),
        loginUrl = path.join(authUrl, "login"),
        logoutUrl = path.join(authUrl, "logout"),
        googleAuthUrl = path.join(authUrl, "google"),
        auth;

    passport.use(google(host, googleAuthUrl));
    auth = passport.authenticate("google", {failureRedirect: loginUrl});

    router.get(googleAuthUrl, auth, route);

    router.get(loginUrl, function(req, res) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.write("<!doctype html><html><head><title>");
        res.write("Login");
        res.write("</title></head><body>");
        res.write("<a href='" + googleAuthUrl + "'>Google Sign-in</a>");
        res.write("</body></html>");
        res.end();
    });

    router.get(logoutUrl, logout(), route);

    return router;
}

/** export middleware function */
module.exports = auth;
