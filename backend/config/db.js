const mongoose = require('mongoose');

/**
 * Connexion à la base de données MongoDB
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/todolist_db');
    console.log(`[MongoDB] Connecté avec succès : ${conn.connection.host}`);
  } catch (error) {
    console.error(`[MongoDB] Erreur de connexion : ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
