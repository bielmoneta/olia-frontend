import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EscolaService } from '../../services/escola.service';
import { ModalColetaComponent } from '../modal-agenda-coleta/modal-agenda-coleta';

@Component({
  selector: 'app-dashboard-escola',
  imports: [CommonModule, ModalColetaComponent],
  templateUrl: './dashboard-escola.html',
  styleUrl: './dashboard-escola.css',
})
export class DashboardEscola implements OnInit {
  private service = inject(EscolaService);
  modalColetaAberto = false;
  posicao: number = 0;

  abrirModalColeta() {
    this.modalColetaAberto = true;
  }

  dados = {
    nome: 'Carregando...',
    totalColetado: 0,
    coletasRealizadas: 0,
    pontos: 0,
    capacidadeMaxima: 100,
    ocupacaoAtual: 0,
    porcentagemOcupacao: 0,
    metaPontos: 500,
  };

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {
    const id = sessionStorage.getItem('idEscola');
    if (id) {
      this.service.getDashboard(+id).subscribe({
        next: (resposta) => {
          this.dados = resposta;
          this.buscarPosicaoNoRanking();
        },
        error: (err) => console.error('Erro ao carregar dashboard', err),
      });
    }
  }

  buscarPosicaoNoRanking() {
    this.service.getRanking().subscribe((lista: any[]) => {
      // Procura o nome da escola atual dentro da lista do ranking
      const index = lista.findIndex((item) => item.nome === this.dados.nome);
      if (index !== -1) {
        this.posicao = index + 1;
      }
    });
  }
}
