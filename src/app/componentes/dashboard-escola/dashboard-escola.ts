import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EscolaService } from '../../services/escola.service';

@Component({
  selector: 'app-dashboard-escola',
  imports: [CommonModule],
  templateUrl: './dashboard-escola.html',
  styleUrl: './dashboard-escola.css',
})
export class DashboardEscola implements OnInit {

  private service = inject(EscolaService);

  dados = {
    nome: 'Carregando...',
    totalColetado: 0,
    coletasRealizadas: 0,
    pontos: 0,
    capacidadeMaxima: 100,
    ocupacaoAtual: 0,
    porcentagemOcupacao: 0
  };

  metaPontos = 2000;

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {
    const id = sessionStorage.getItem('idEscola');
    if (id) {
      this.service.getDashboard(+id).subscribe({
        next: (resposta) => {
          this.dados = resposta;
        },
        error: (err) => console.error('Erro ao carregar dashboard', err)
      });
    }
  }

  solicitarColeta() {
    alert('Solicitação enviada para o Governo!');
    // TODO: Implementar integração com governo
  }
}
