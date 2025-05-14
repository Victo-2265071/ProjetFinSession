import express from 'express';
import morgan from 'morgan';
import fs from 'fs';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import tachesRoutes from './src/routes/taches.route.js';

// Créer une application express
const app = express();
app.use(cors());

// Importer les middlewares
app.use(express.json());
const swaggerDocument = JSON.parse(fs.readFileSync('./src/config/documentation.json', 'utf8'));

const swaggerOptions = {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: "Projet Final SW25 - William Champagne"
};

//Configuration de morgan
const accessLogStream = fs.createWriteStream('./src/logs/access.log', {flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream}));

// ===============
// Routes
// ===============

app.use('/api/taches', tachesRoutes);

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));


// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});

