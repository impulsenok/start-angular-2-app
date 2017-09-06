const config                = require('config').get('redis');

const Promise               = require('bluebird');

const cacheManager          = require('cache-manager');
const redisStore            = require('cache-manager-redis');
const redisCache            = Promise.promisifyAll(cacheManager.caching({
    store: redisStore,
    host: config.connect.host,
    port: config.connect.port,
    ttl: 3600
}));

let instance = null;

// listen for redis connection error event
redisCache.store.events.on('redisError', function(error) {
    // handle error here
    console.log(error);
});

class Cacher {
    constructor() {}

    static getInstance() {

        if (!instance) {
            instance = new Cacher();
        }

        return instance;
    }
}

module.exports = Cacher;