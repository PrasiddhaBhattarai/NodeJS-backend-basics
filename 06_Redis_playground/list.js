import { client } from "./client.js";

async function init() {
    try {
        await client.lpush('messages', 1);
        await client.lpush('messages', 2);
        await client.lpush('messages', 3);
        await client.lpush('messages', 4);
        const result = await client.rpop('messages');
        console.log(result);
    } catch (err) {
        console.error('Error accessing Redis:', err);
    } finally {
        await client.quit();
    }
}

init();