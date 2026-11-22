import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  // URL de base de l'API backend Express
  private readonly apiUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) { }

  /**
   * Récupérer toutes les tâches (GET /tasks)
   */
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  /**
   * Récupérer une tâche par ID (GET /tasks/:id)
   */
  getTaskById(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }

  /**
   * Créer une nouvelle tâche (POST /tasks)
   */
  createTask(task: { title: string; description?: string }): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  /**
   * Mettre à jour une tâche existante (PUT /tasks/:id)
   */
  updateTask(id: string, task: Partial<Task>): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, task);
  }

  /**
   * Basculer le statut complété d'une tâche (Terminer / Reprendre)
   */
  toggleComplete(task: Task): Observable<Task> {
    const taskId = task._id || task.id;
    return this.updateTask(taskId!, { completed: !task.completed });
  }

  /**
   * Supprimer une tâche (DELETE /tasks/:id)
   */
  deleteTask(id: string): Observable<{ message: string; id: string }> {
    return this.http.delete<{ message: string; id: string }>(`${this.apiUrl}/${id}`);
  }
}
