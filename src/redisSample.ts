import { redisClient } from "@/config/redis"; 

// Set a key-value pair with no expiration
redisClient.set('myKey', 'myValue')
  .then(async () => {
    console.log('Key set successfully');
    
    // Check if key exists
    const exists = await redisClient.exists('myKey');
    console.log('Key exists:', exists === 1);
    
    // Get the value
    const value = await redisClient.get('myKey');
    console.log('Key value:', value);
  })
  .catch((err) => console.error('Error:', err));