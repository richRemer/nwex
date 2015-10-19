var request = require("request");

/**
 * Create a signal which can be used on synced models to call a web endpoint.
 * @param {string|function} url
 * @param {object|function} [data]
 */
function signal(url, data) {
    return function() {
        var opts = {};
    
        if (typeof url === "function") opts.url = url.call(this);
        else opts.url = this.url() + "/" + url;
        
        if (typeof data === "function") data = data.call(this);
        if (data) opts.json = data;
        
        request.post(opts, this.sync.bind(this, undefined));
    };
}

/** export signal function */
module.exports = signal;
