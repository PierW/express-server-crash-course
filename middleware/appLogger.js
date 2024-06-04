// Middleware Route Level
const appLogger = (req, res, next) => {
    console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl} APP LEVEL`);
    next();
}

export default appLogger;