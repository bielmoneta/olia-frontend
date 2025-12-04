import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EscolaService } from '../../services/escola.service';

@Component({
  selector: 'app-ranking-escola',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ranking-escola.html',
  styleUrl: './ranking-escola.css',
})
export class RankingEscolaComponent implements OnInit {

  constructor(private service: EscolaService) {}

  minhaEscola: any = null;
  ranking: any[] = [];

  ngOnInit() {
    this.carregarRanking();
  }

  carregarRanking() {
    this.service.getRanking().subscribe({
      next: (lista: any[]) => {
        this.ranking = lista;
        this.identificarMinhaEscola();
      },
      error: (err: any) => console.error('Erro ao carregar ranking', err),
    });
  }

  identificarMinhaEscola() {
    // Pega o nome da escola logada que salvamos na sessão
    const nomeLogado = sessionStorage.getItem('nomeUsuario');

    if (nomeLogado) {
      // Procura na lista quem tem esse nome
      const encontrada = this.ranking.find((e) => e.nome === nomeLogado);

      if (encontrada) {
        // Marca para ficar verde na lista
        encontrada.ehMinhaEscola = true;

        // Atualiza o card do topo
        this.minhaEscola = encontrada;
      }
    }
  }

  // Função auxiliar para definir a cor da medalha
  getCorMedalha(posicao: number): string {
    switch (posicao) {
      case 1:
        return 'ouro';
      case 2:
        return 'prata';
      case 3:
        return 'bronze';
      default:
        return 'padrao';
    }
  }
}
