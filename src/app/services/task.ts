import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Task {
  id: number;
  titulo: string;
  descricao: string;
  dataLimite: string;
  categoria: string;
  concluida: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private http = inject(HttpClient);

  private tasksSignal = signal<Task[]>([]);
  public loadingSignal = signal<boolean>(false);
  public errorSignal = signal<string | null>(null);

  public tasks = this.tasksSignal.asReadonly();

  public totalTasks = computed(() => this.tasksSignal().length);

  public pendingTasksCount = computed(() => 
    this.tasksSignal().filter(t => !t.concluida).length
  );

  public urgentTasksCount = computed(() => {
    const agora = new Date().getTime();
    return this.tasksSignal().filter(t => {
      if (t.concluida) return false;
      const limite = new Date(t.dataLimite).getTime();
      const horasRestantes = (limite - agora) / (1000 * 60 * 60);
      return horasRestantes > 0 && horasRestantes <= 24; 
    }).length;
  });

  constructor() {
    this.carregarDadosIniciais();
  }

  carregarDadosIniciais() {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    // Consumindo API pública para dados simulados
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/todos?_limit=5').subscribe({
      next: (dadosApi) => {
        const tarefasIniciais: Task[] = dadosApi.map((item, idx) => ({
          id: item.id,
          titulo: item.title,
          descricao: `Prazo crítico associado à entrega do registro #${item.id}.`,
          dataLimite: new Date(Date.now() + (idx + 1) * 12 * 3600 * 1000).toISOString(),
          categoria: idx % 2 === 0 ? 'Acadêmico' : 'Trabalho',
          concluida: item.completed
        }));

        this.tasksSignal.set(tarefasIniciais);
        this.loadingSignal.set(false);
      },
      error: (err) => {
        this.errorSignal.set('Erro ao carregar os dados do servidor. Tente novamente.');
        this.loadingSignal.set(false);
      }
    });
  }

  obterPorId(id: number): Task | undefined {
    return this.tasksSignal().find(t => t.id === id);
  }

  adicionarTarefa(novaTarefa: Omit<Task, 'id' | 'concluida'>) {
    const tarefa: Task = {
      ...novaTarefa,
      id: Date.now(),
      concluida: false
    };
    this.tasksSignal.update(lista => [tarefa, ...lista]);
  }

  alternarStatus(id: number) {
    this.tasksSignal.update(lista =>
      lista.map(t => t.id === id ? { ...t, concluida: !t.concluida } : t)
    );
  }

  removerTarefa(id: number) {
    this.tasksSignal.update(lista => lista.filter(t => t.id !== id));
  }
}