import redis from 'redis';

class RedisClient {
    constructor() {
        this.client = redis.createClient();

        // Display any errors of the redis client in the console
        this.client.on('error', (error) => {
            console.error(`Redis client error: ${error}`);
        });
    }

    isAlive() {
        return this.client.connected;
    }

    async get(key) {
        return new Promise((resolve, reject) => {
            this.client.get(key, (error, value) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(value);
                }
            });
        });
    }

    async set(key, value, duration) {
        this.client.set(key, value);
        this.client.expire(key, duration);
    }

    async del(key) {
        this.client.del(key);
    }
}

const redisClient = new RedisClient();

export default redisClient;

