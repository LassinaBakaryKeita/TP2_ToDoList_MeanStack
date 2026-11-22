const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');

// Chargement des variables d'environnement
dotenv.config();

// Initialisation de l'application Express
const app = express();

// Connexion à la base de données MongoDB
connectDB();

// Middlewares globaux
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Journalisation simple des requêtes entrantes
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Route d'accueil / statut
app.get('/', (req, res) => {
  res.json({
    message: 'API To-Do List opérationnelle (MEAN Stack)',
    endpoints: {
      getAllTasks: 'GET /tasks',
      createTask: 'POST /tasks',
      updateTask: 'PUT /tasks/:id',
      deleteTask: 'DELETE /tasks/:id'
    }
  });
});

// Enregistrement des routes de gestion des tâches
// Supporte à la fois /tasks et /api/tasks
app.use('/tasks', taskRoutes);
app.use('/api/tasks', taskRoutes);

// Gestion des routes inexistantes (404)
app.use((req, res) => {
  res.status(404).json({ message: 'Route introuvable' });
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error('[Erreur Serveur]', err.stack);
  res.status(500).json({
    message: 'Une erreur interne est survenue',
    error: err.message
  });
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Serveur To-Do List démarré sur le port ${PORT}`);
  console.log(` URL de base : http://localhost:${PORT}`);
  console.log(` Endpoints : http://localhost:${PORT}/tasks`);
});
