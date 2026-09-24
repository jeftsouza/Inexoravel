import { Component, input, output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Task } from '../../services/task';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './task-card.html',
  styleUrl: './task-card.css'
})
export class TaskCardComponent {
  // Recebe a tarefa do pai via input()
  task = input.required<Task>();

  // Eventos emitidos para o pai via output()
  toggleStatus = output<number>();
  removeTask = output<number>();

  // Sinal para controlar a animação de sangue
  isBleeding = signal(false);
  handleToggle() {
    // Se a tarefa não estiver concluída, dispara o efeito de sangue
    if (!this.task().concluida) {
      this.isBleeding.set(true);
      setTimeout(() => this.isBleeding.set(false), 700);
    }
    this.onToggle();
  }
  
  onToggle() {
    this.toggleStatus.emit(this.task().id);
  }

  onRemove() {
    this.removeTask.emit(this.task().id);
  }

  getUrgenciaClass(): string {
    if (this.task().concluida) return 'border-zinc-800 opacity-60';
    const limite = new Date(this.task().dataLimite).getTime();
    const agora = Date.now();
    const horas = (limite - agora) / (1000 * 60 * 60);

    if (horas <= 0) return 'border-red-900/60 bg-red-950/10';
    if (horas <= 24) return 'border-amber-600/60 bg-amber-950/10';
    return 'border-zinc-800 bg-zinc-900/40';
  }
}