const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

/**
 * Routes pour la gestion des tâches (CRUD)
 * GET    /tasks     : Récupérer toutes les tâches
 * POST   /tasks     : Ajouter une nouvelle tâche
 * GET    /tasks/:id : Récupérer une tâche spécifique
 * PUT    /tasks/:id : Mettre à jour une tâche existante
 * DELETE /tasks/:id : Supprimer une tâche
 */

router.get('/', taskController.getTasks);
router.post('/', taskController.createTask);
router.get('/:id', taskController.getTaskById);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
