import express from 'express';
import path from 'path';
import posts from './routes/posts.js';
import appLogger from './middleware/appLogger.js';
const app = express();
const port = process.env.PORT || 8000;



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

// Body Parser Middleware per leggere il body (Ora incluso in Express)
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Importo Middleware (App Level)
app.use(appLogger);

app.use('/api/posts', posts);


app.listen(port, () => {
    console.log(`Server in ascolto sulla porta ${port}`);
});