import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from './services/task.service';
import { Task } from './models/task.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  // Liste des tâches
  tasks: Task[] = [];

  // Formulaire d'ajout
  newTitle: string = '';
  newDescription: string = '';
  isSubmitting: boolean = false;

  // Gestion du mode édition
  editingTaskId: string | null = null;
  editTitle: string = '';
  editDescription: string = '';

  // Indicateurs d'état
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  /**
   * Charger toutes les tâches depuis l'API backend
   */
  loadTasks(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur de chargement des tâches:', err);
        this.showError('Impossible de contacter le serveur backend (http://localhost:3000). Assurez-vous que le backend et MongoDB sont bien démarrés.');
        this.isLoading = false;
      }
    });
  }

  /**
   * Ajouter une nouvelle tâche via le formulaire
   */
  addTask(): void {
    if (this.isSubmitting) return;

    const trimmedTitle = this.newTitle.trim();
    if (!trimmedTitle) {
      this.showError('Veuillez saisir un titre pour la tâche.');
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    this.taskService.createTask({
      title: trimmedTitle,
      description: this.newDescription.trim()
    }).subscribe({
      next: (createdTask) => {
        this.tasks.unshift(createdTask);
        this.newTitle = '';
        this.newDescription = '';
        this.isSubmitting = false;
        this.showSuccess('Tâche ajoutée avec succès !');
      },
      error: (err) => {
        console.error('Erreur lors de l’ajout de la tâche:', err);
        this.isSubmitting = false;
        this.showError('Erreur lors de l’ajout de la tâche. Veuillez réessayer.');
      }
    });
  }

  /**
   * Basculer le statut d'une tâche (Terminer / Reprendre)
   */
  toggleComplete(task: Task): void {
    this.taskService.toggleComplete(task).subscribe({
      next: (updatedTask) => {
        const id = task._id || task.id;
        const index = this.tasks.findIndex(t => (t._id || t.id) === id);
        if (index !== -1) {
          this.tasks[index] = updatedTask;
        }
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour du statut:', err);
        this.showError('Erreur lors du changement de statut de la tâche.');
      }
    });
  }

  /**
   * Activer le mode édition pour une tâche donnée
   */
  startEdit(task: Task): void {
    this.editingTaskId = task._id || task.id || null;
    this.editTitle = task.title;
    this.editDescription = task.description || '';
  }

  /**
   * Annuler le mode édition
   */
  cancelEdit(): void {
    this.editingTaskId = null;
    this.editTitle = '';
    this.editDescription = '';
  }

  /**
   * Sauvegarder la modification du contenu de la tâche
   */
  saveEdit(task: Task): void {
    const id = task._id || task.id;
    if (!id) return;

    const trimmedTitle = this.editTitle.trim();
    if (!trimmedTitle) {
      this.showError('Le titre ne peut pas être vide.');
      return;
    }

    this.taskService.updateTask(id, {
      title: trimmedTitle,
      description: this.editDescription.trim()
    }).subscribe({
      next: (updated) => {
        const index = this.tasks.findIndex(t => (t._id || t.id) === id);
        if (index !== -1) {
          this.tasks[index] = updated;
        }
        this.cancelEdit();
        this.showSuccess('Tâche modifiée avec succès !');
      },
      error: (err) => {
        console.error('Erreur lors de la modification:', err);
        this.showError('Erreur lors de la modification de la tâche.');
      }
    });
  }

  /**
   * Supprimer une tâche
   */
  deleteTask(task: Task): void {
    const id = task._id || task.id;
    if (!id) return;

    if (confirm(`Voulez-vous vraiment supprimer la tâche "${task.title}" ?`)) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          this.tasks = this.tasks.filter(t => (t._id || t.id) !== id);
          this.showSuccess('Tâche supprimée avec succès !');
        },
        error: (err) => {
          console.error('Erreur lors de la suppression:', err);
          this.showError('Erreur lors de la suppression de la tâche.');
        }
      });
    }
  }

  /**
   * Effacer les messages d'erreur lors de la frappe
   */
  clearMessages(): void {
    if (this.errorMessage) {
      this.errorMessage = '';
    }
  }

  /**
   * Afficher un message d'erreur avec disparition automatique
   */
  showError(msg: string): void {
    this.errorMessage = msg;
    setTimeout(() => {
      if (this.errorMessage === msg) {
        this.errorMessage = '';
      }
    }, 4000);
  }

  /**
   * Afficher un message de succès temporaire (3 secondes)
   */
  showSuccess(msg: string): void {
    this.successMessage = msg;
    setTimeout(() => {
      if (this.successMessage === msg) {
        this.successMessage = '';
      }
    }, 3000);
  }
}
