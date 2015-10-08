var Passport = require("passport").Passport,
    GoogleStrategy = require("passport-google-oauth").OAuth2Strategy,
    express = require("express"),
    cookieSession = require("cookie-session"),
    bodyParser = require("body-parser"),
    path = require("path"),
    render = require("./render"),
    logout = require("./logout");

var users = {};

/**
 * Create Google Passport strategy.
 * @param {string} host
 * @param {string} authUrl
 * @returns {GoogleStrategy}
 */
function google(host, authUrl) {
    var returnUrl = "http://" + path.join(host, authUrl),
        strategy;

    function success(accessToken, refreshToken, profile, done) {
        done(null, profile);
    }

    strategy = new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: returnUrl
    }, success);

    return strategy;
}

/**
 * Serialize user for session storage.
 * @param {object} user
 * @param {function} done
 */
function serializeUser(user, done) {
    users[user.id] = user;
    done(null, user.id);
}

/**
 * Deserialize user from session storage.
 * @param {string} id
 * @param {function} done
 */
function deserializeUser(id, done) {
    done(null, users[id]);
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
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    auth = passport.authenticate("google", {
        scope: "profile",
        failureRedirect: loginUrl
    });

    router.use(cookieSession({keys: ["S3kr3T"]}));
    router.use(bodyParser.urlencoded({extended: true}));
    router.use(passport.initialize());
    router.use(passport.session());

    router.get(googleAuthUrl, auth, route);
    router.get(loginUrl, render("login"));
    router.get(logoutUrl, logout(), route);

    return router;
}

/** export middleware function */
module.exports = auth;
