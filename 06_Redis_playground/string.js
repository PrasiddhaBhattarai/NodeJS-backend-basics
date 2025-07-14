import { client } from "./client.js";

async function init() {
    try {
        // await client.set("user:4", "Joan", "EX", 60);
        //user:4 automatically gets deleted from redis server in 60 seconds
        
        const result = await client.get('user:1');
        console.log(result);
    } catch (err) {
        console.error('Error accessing Redis:', err);
    } finally {
        await client.quit();
    }
}

init();