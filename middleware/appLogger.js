import colors from 'colors';

// Middleware Route Level
const appLogger = (req, res, next) => {
    const methodColors = {
        GET : 'green',
        PUT : 'yellow',
        POST: 'blue',
        DELETE: 'red'
    };
    const color = methodColors[req.method] || 'white';

    console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl} APP LEVEL`[color]);
    next();
}

export default appLogger;