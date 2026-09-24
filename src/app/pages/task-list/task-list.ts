import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TaskService } from '../../services/task';
import { TaskCardComponent } from '../../components/task-card/task-card';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [RouterLink, TaskCardComponent],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskListComponent {
  taskService = inject(TaskService);

  onToggleStatus(id: number) {
    this.taskService.alternarStatus(id);
  }

  onRemoveTask(id: number) {
    this.taskService.removerTarefa(id);
  }
}