/**
 * Modèle de données pour une tâche (Task)
 * Conforme au modèle MongoDB défini dans le Backend
 */
export interface Task {
  _id?: string;
  id?: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
}
