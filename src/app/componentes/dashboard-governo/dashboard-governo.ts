import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColetaService } from '../../services/coleta';

@Component({
  selector: 'app-dashboard-governo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-governo.html',
  styleUrl: './dashboard-governo.css',
})
export class DashboardGovernoComponent implements OnInit {
  private service = inject(ColetaService);
  
  coletas: any[] = []; // Lista geral
  filtroAtual = 'PENDENTE'; // Começa vendo os pendentes

  // Dados dos Cards de Resumo
  resumo = {
    pendentes: 0,
    agendadas: 0,
    concluidas: 0,
  };

  ngOnInit() {
    this.carregarColetas();
  }

  carregarColetas() {
    this.service.listarTodas().subscribe({
      next: (lista) => {
        this.coletas = lista;
        this.atualizarResumo();
      },
      error: (err) => console.error(err),
    });
  }

  // Filtra a lista na tela baseado na aba selecionada
  get coletasFiltradas() {
    return this.coletas.filter((c) => c.status === this.filtroAtual);
  }

  mudarFiltro(novoFiltro: string) {
    this.filtroAtual = novoFiltro; // Ex: 'PENDENTE', 'AGENDADA', 'CONCLUIDA'
  }

  // Conta quantos tem de cada tipo para mostrar nos cards
  atualizarResumo() {
    this.resumo.pendentes = this.coletas.filter((c) => c.status === 'PENDENTE').length;
    this.resumo.agendadas = this.coletas.filter((c) => c.status === 'AGENDADA').length;
    this.resumo.concluidas = this.coletas.filter((c) => c.status === 'CONCLUIDA').length;
  }

  agendarColeta(coleta: any) {
    if (confirm(`Agendar coleta para ${coleta.escola}?`)) {
      this.service.mudarStatus(coleta.id, 'AGENDADA').subscribe({
        next: () => {
          alert('Status atualizado para Agendada!');
          this.carregarColetas(); // Recarrega a lista
        },
        error: () => alert('Erro ao atualizar status.'),
      });
    }
  }

  // Se quiser um botão para concluir também (na aba de agendadas)
  concluirColeta(coleta: any) {
    this.service.mudarStatus(coleta.id, 'CONCLUIDA').subscribe(() => {
      this.carregarColetas();
    });
  }
}
