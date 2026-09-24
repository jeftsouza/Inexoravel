import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Task, TaskService } from '../../services/task';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './task-detail.html',
  styleUrl: './task-detail.css'
})
export class TaskDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private taskService = inject(TaskService);

  task = signal<Task | undefined>(undefined);

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = Number(idParam);
      this.task.set(this.taskService.obterPorId(id));
    }
  }

  toggleStatus() {
    const t = this.task();
    if (t) {
      this.taskService.alternarStatus(t.id);
      this.task.set(this.taskService.obterPorId(t.id));
    }
  }
}