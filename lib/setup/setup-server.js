var TerminalServer = require("../terminal/terminal-server"),
    synced = require("../synced");

/**
 * Server model for setup pages.
 * @augments {TerminalServer}
 */
function SetupServer() {

    /**
     * @name SetupServer#clientId
     * @type {string}
     */
    this.clientId = "";
    
    /**
     * @name SetupServer#clientSecret
     * @type {string}
     */
    this.clientSecret = "";

    TerminalServer.call(this);
}

SetupServer.prototype = Object.create(TerminalServer.prototype);
SetupServer.prototype.constructor = SetupServer;

/**
 * Enable temporary storage.
 */
SetupServer.prototype.enableStorage = synced.signal(function() {
    return this.baseUrl() + "setup/temporary-storage";
});

/**
 * Configure Google OAuth2 authentication.
 */
SetupServer.prototype.configureAuth = synced.signal(function() {
    return this.baseUrl() + "setup/google-oauth2";
}, function() {
    return {clientId: this.clientId, clientSecret: this.clientSecret};
});

/** export setup server model */
module.exports = SetupServer;
