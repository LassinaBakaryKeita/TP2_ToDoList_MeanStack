const Task = require('../models/Task');

/**
 * @desc    Récupérer toutes les tâches
 * @route   GET /tasks
 */
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: 'Erreur lors de la récupération des tâches',
      error: error.message
    });
  }
};

/**
 * @desc    Récupérer une tâche par son identifiant
 * @route   GET /tasks/:id
 */
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Tâche non trouvée' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      message: 'Erreur lors de la récupération de la tâche',
      error: error.message
    });
  }
};

/**
 * @desc    Créer une nouvelle tâche
 * @route   POST /tasks
 */
exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'Le titre de la tâche est obligatoire' });
    }

    const newTask = new Task({
      title: title.trim(),
      description: description ? description.trim() : '',
      completed: false
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({
      message: 'Erreur lors de la création de la tâche',
      error: error.message
    });
  }
};

/**
 * @desc    Mettre à jour une tâche existante
 * @route   PUT /tasks/:id
 */
exports.updateTask = async (req, res) => {
  try {
    const { title, description, completed } = req.body;

    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Tâche non trouvée' });
    }

    if (title !== undefined) task.title = title.trim();
    if (description !== undefined) task.description = description.trim();
    if (completed !== undefined) task.completed = Boolean(completed);

    const updatedTask = await task.save();
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({
      message: 'Erreur lors de la mise à jour de la tâche',
      error: error.message
    });
  }
};

/**
 * @desc    Supprimer une tâche
 * @route   DELETE /tasks/:id
 */
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Tâche non trouvée' });
    }

    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Tâche supprimée avec succès', id: req.params.id });
  } catch (error) {
    res.status(500).json({
      message: 'Erreur lors de la suppression de la tâche',
      error: error.message
    });
  }
};
