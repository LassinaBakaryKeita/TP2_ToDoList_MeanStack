const mongoose = require('mongoose');

/**
 * Schéma Mongoose pour l'entité Task (Tâche)
 *  - title : le titre de la tâche (texte, obligatoire)
 *  - description : description facultative de la tâche (texte)
 *  - completed : statut de la tâche (booléen, défaut false)
 */
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Le titre de la tâche est obligatoire'],
      trim: true
    },
    description: {
      type: String,
      default: '',
      trim: true
    },
    completed: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret.__v;
        return ret;
      }
    }
  }
);

module.exports = mongoose.model('Task', taskSchema);
