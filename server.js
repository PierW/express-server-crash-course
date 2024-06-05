import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import posts from './routes/posts.js';
import appLogger from './middleware/appLogger.js';
import errorHandler from './middleware/error.js';
import notFound from './middleware/notFound.js';
const app = express();
const port = process.env.PORT || 8000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware per leggere il body (Ora incluso in Express)
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Importo Middleware (App Level)
app.use(appLogger);

// Route Posts
app.use('/api/posts', posts);

// Catch all errors
app.use(notFound);

// Importo Middleware ErrorHandler (Sotto le Routes dei post per evitare conflitti)
app.use(errorHandler);


app.listen(port, () => {
    console.log(`Server in ascolto sulla porta ${port}`);
});