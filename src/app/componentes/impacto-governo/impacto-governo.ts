import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GovernoService } from '../../services/governo.service';
import { EscolaService } from '../../services/escola.service';

@Component({
  selector: 'app-impacto-governo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './impacto-governo.html',
  styleUrl: './impacto-governo.css',
})
export class ImpactoGovernoComponent implements OnInit {
  private governoService = inject(GovernoService);
  private escolaService = inject(EscolaService);

  resumo = {
    oleoReciclado: 0,
    sabaoProduzido: 0,
    escolasAtivas: 0,
    beneficiarios: 0,
  };

  ranking: any[] = [];

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {
    // 1. Carrega os Cards do Topo
    this.governoService.getImpactoGlobal().subscribe({
      next: (dados) => {
        console.log('Dados de impacto recebidos do backend:', dados); // Adicione este log
        this.resumo = dados;
      },
      error: (err) => console.error('Erro impacto:', err),
    });

    // 2. Carrega o Ranking
    this.escolaService.getRanking().subscribe({
      next: (lista) => {
        // Pegamos apenas os top 5 para exibir nessa tela
        this.ranking = lista.slice(0, 5).map((escola) => {
          // Calculamos a % da barra baseada no 1º lugar (que é o maior)
          const maiorPontuacao = lista[0].pontos || 1;
          escola.percentual = (escola.pontos / maiorPontuacao) * 100;
          return escola;
        });
      },
      error: (err) => console.error('Erro ranking:', err),
    });
  }

  exportarRelatorio() {
    alert('Funcionalidade futura: Gerar PDF!');
  }
}
