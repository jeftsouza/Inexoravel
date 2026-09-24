import { Routes } from '@angular/router';
import { TaskListComponent } from './pages/task-list/task-list';
import { TaskDetailComponent } from './pages/task-detail/task-detail';
import { TaskFormComponent } from './pages/task-form/task-form';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
  { path: '', redirectTo: 'tarefas', pathMatch: 'full' },
  { path: 'tarefas', component: TaskListComponent },
  { path: 'tarefa/nova', component: TaskFormComponent },
  { path: 'tarefa/:id', component: TaskDetailComponent },
  { path: '**', component: NotFound }
];