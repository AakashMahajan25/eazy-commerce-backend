import app from './app'
import { PORT } from '@/config/env'
import { JWT_CONFIG } from './config/jwt';

// console.log(JWT_CONFIG.accessTokenExpiry);
// console.log(JWT_CONFIG.accessTokenSecret);
// console.log(JWT_CONFIG.refreshTokenExpiry);
// console.log(JWT_CONFIG.refreshTokenSecret);



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

