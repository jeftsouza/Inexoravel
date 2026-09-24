import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css'
})
export class TaskFormComponent {
  private taskService = inject(TaskService);
  private router = inject(Router);

  titulo = '';
  descricao = '';
  categoria = 'Acadêmico';
  dataLimite = '';

  onSubmit() {
    if (!this.titulo || !this.dataLimite) return;

    this.taskService.adicionarTarefa({
      titulo: this.titulo,
      descricao: this.descricao,
      categoria: this.categoria,
      dataLimite: new Date(this.dataLimite).toISOString()
    });

    this.router.navigate(['/tarefas']);
  }
}