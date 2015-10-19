var prop = require("propertize"),
    request = require("request"),
    signal = require("./synced-signal");

/**
 * @enum
 * @type {string}
 * @readonly
 */
var SyncStatus = {
    SYNCABLE: "syncable",           // initial state; call sync()
    SYNCING: "syncing",             // syncing with URL
    REFRESHING: "refreshing",       // refreshing data from URL
    SYNCED: "synced",               // data synced to URL
};

/**
 * Internal status for synced model.
 * @typedef {object} SyncState
 * @property {SyncStatus} status    syncing status
 * @property {*} handle             opaque setTimeout result
 * @property {object} data          data of last successful sync
 * @property {Error} error          last sync error
 */

/**
 * Syncable model.
 * @mixin
 */
var Synced = {
    /**
     * Internal sync state of model.
     * @type {SyncState}
     * @readonly
     */
    synced: {
        status: SyncStatus.SYNCABLE,
        handle: undefined,
        data: undefined,
        error: undefined
    },

    /**
     * Enable or disable syncing if a boolean is passed.  If no argument is
     * passed, perform a sync and return a Promise which resolved to true if
     * the object was updated from the sync.
     * @param {boolean} [enable]
     * @returns {Promise}
     */
    sync: function(enable) {
        var synced = this,
            enable = enable === undefined ? enable : !!enable;

        // bail out if enabling/disabling for no reason
        if (enable === true && !syncable(this)) return;
        if (enable === false && syncable(this)) return;

        // enable...
        if (enable === true) return enableSync(this);

        // ...or disable
        else if (enable === false) return disableSync(this);

        // execute sync and return Promise
        return new Promise(function(resolve, reject) {
            var opts = {method: "GET", url: synced.url()};
            request(opts, function(err, res, body) {
                var changed = false,
                    name, data;

                if (err) return reject(err);
                else {
                    data = JSON.parse(body);
                    for (var name in data) {
                        if (synced[name] !== data[name]) {
                            changed = true;
                            synced[name] = data[name];
                        }
                    }
                }

                resolve(changed);
            });
        });
    }

};

/**
 * Return true if the object does not have syncing enabled.
 * @param {Synced} obj
 * @returns {boolean}
 */
function syncable(obj) {
    return obj.synced.status === SyncStatus.SYNCABLE;
}

/**
 * Return true if the synced object has syncing enabled.
 * @param {Synced} obj
 * @returns {boolean}
 */
function syncing(obj) {
    return obj.synced.status !== SyncStatus.SYNCABLE;
}

/**
 * Return true if the synced object has not been synced since syncing was
 * enabled.
 * @param {Synced} obj
 * @returns {boolean}
 */
function unsynced(obj) {
    return obj.synced.status !== SyncStatus.SYNCABLE
        && obj.synced.status !== SyncStatus.SYNCING;
}

/**
 * Enable syncing.
 * @param {Synced} obj
 */
function enableSync(obj) {
    var backoff = [0,1];

    /**
     * Return the current sync wait; optionally increase wait first.
     * @param {boolean} [increase]
     * @returns {number}
     */
    function wait(increase) {
        if (increase) backoff.push(backoff[0]+backoff[1]), backoff.shift();
        return backoff[0];
    }

    /**
     * Execute a single sync, then schedule another one.
     */
    function attempt() {
        obj.sync().then(function(changed) {
            // reset backoff whenever change is made
            if (changed) backoff = [0,1];

            // update sync state
            obj.synced.status = SyncStatus.SYNCED;
            obj.synced.error = undefined;

            // if syncing hasn't been disabled, schedule next attempt
            if (obj.synced.handle) {
                obj.synced.handle = setTimeout(attempt, wait(!change));
            }
        }).catch(function(err) {
            // update sync state
            obj.synced.error = err;
            if (!unsynced(obj)) obj.synced.status = SyncStatus.SYNCED;

            // if syncing hasn't been disabled, schedule next attempt
            if (obj.synced.handle) {
                obj.synced.handle = setTimeout(attempt, wait(true));
            }
        });
    }

    if (!syncable(obj)) throw new Error("object already syncing");
    obj.synced.status = SyncStatus.SYNCING;
    obj.synced.handle = setTimeout(attempt, 0);
}

/**
 * Disable syncing.
 * @param {Synced} obj
 */
function disableSync(obj) {
    if (syncable(obj)) throw new Error("object is not syncing");
    obj.synced.status = SyncStatus.SYNCABLE;
    if (obj.synced.handle) clearTimeout(obj.synced.handle);
    obj.synced.handle = undefined;
}

/**
 * Mixin Synced class.
 * @param {object} obj
 */
function synced(obj) {
    prop.readonly(obj, "sync", Synced.sync);
    prop.readonly(obj, "synced", {
        status: SyncStatus.SYNCABLE,
        handle: undefined,
        data: undefined,
        error: undefined        
    });
}

module.exports = synced;
module.exports.signal = signal;
