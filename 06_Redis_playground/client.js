// we use 'ioredis' as our redis client
// some syntax might be different if 'redis' was used instead
import {Redis} from 'ioredis';

// Create a Redis client instance
/*
const client = new Redis({
  host: '127.0.0.1', // default host
  port: 6379,        // default Redis port
  // password: 'your_password', // Uncomment if authentication is needed
  // db: 0, // Optional: specify DB index
});
*/

const client = new Redis();
//Creates a new Redis client instance using the ioredis library.
// Establishes a connection to a Redis server (by default, at localhost:6379).
// Stores the Redis client in the constant variable client.

export {client};