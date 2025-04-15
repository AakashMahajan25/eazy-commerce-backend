import express from 'express';
import * as os from 'os';
import path from 'path';

const router = express.Router();

router.get('/', (req, res) => {
    // Get CPU info
    const cpuInfo = os.cpus();
    const cpuModel = cpuInfo.length > 0 ? cpuInfo[0].model : 'Unknown';
    
    // Calculate CPU usage (this is simplified - for more accurate values consider using a library)
    const cpuUsage = Math.round(Math.random() * 100); // This is just a placeholder
    
    // Get memory info
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    const usedMemory = totalMemory - freeMemory;
    
    // Get disk info (this is simplified - for more accurate values consider using a library)
    const diskInfo = {
        total: 1000000000000, // 1TB (placeholder)
        free: 400000000000,   // 400GB (placeholder)
        used: 600000000000    // 600GB (placeholder)
    };
    
    // Sample services status
    const services = [
        { name: 'API Server', status: 'healthy' },
        { name: 'Database', status: 'healthy' },
        { name: 'Cache', status: 'healthy' }
    ];
    
    res.json({
        status: 'healthy',
        hostname: os.hostname(),
        uptime: os.uptime(),
        platform: `${os.type()} ${os.release()}`,
        loadAverage: os.loadavg(),
        memory: {
            total: totalMemory,
            free: freeMemory,
            used: usedMemory
        },
        cpu: {
            model: cpuModel,
            cores: os.cpus().length,
            usage: cpuUsage
        },
        disk: diskInfo,
        services: services,
        version: '1.0.0'
    });
});

// Serve health dashboard
router.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../public/health-dashboard.html'));
});

export default router;
