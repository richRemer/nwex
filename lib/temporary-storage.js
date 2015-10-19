var AsyncKeyStorage = require("storage-interface").AsyncKeyStorage;

/**
 * Store data in application memory.
 * @constructor
 */
function TemporaryStorage() {
    this.contents = {};
}

AsyncKeyStorage(TemporaryStorage,
    /** @type {read} */
    function(key, done) {
        var contents = this.contents;
        setTimeout(function() {
            done(null, contents[key]);
        }, 0);
    },
    
    /** @type {write} */
    function(key, value, done) {
        var contents = this.contents;
        setTimeout(function() {
            contents[key] = value;
            done();
        }, 0);
    },
    
    /** @type {remove} */
    function(key, done) {
        var contents = this.contents;
        setTimeout(function() {
            delete contents[key];
            done();
        }, 0);
    }
);

/** export temporary storage driver */
module.exports = TemporaryStorage();
