import express from 'express';
import morgan from 'morgan';
import fs from 'fs';
import cors from 'cors';

import tachesRoutes from './src/routes/taches.route.js';

// Créer une application express
const app = express();
app.use(cors());

// Importer les middlewares
app.use(express.json());

//Configuration de morgan
const accessLogStream = fs.createWriteStream('./src/logs/access.log', {flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream}));

// ===============
// Routes
// ===============

app.use('/api/taches', tachesRoutes);


// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});

