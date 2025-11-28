import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EscolaService } from '../../services/escola.service';

@Component({
  selector: 'app-recompensas-escola',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recompensa-escola.html',
  styleUrl: './recompensa-escola.css'
})
export class RecompensasEscolaComponent implements OnInit {

  private service = inject(EscolaService);

  pontosAtuais = 0;

  // Lista de Recompensas mockados
  // criar uma tabela 'recompensas' no banco
  itens = [
    {
      id: 1,
      titulo: 'Computadores Novos',
      descricao: '5 computadores para laboratório de informática',
      custo: 2500,
      icone: 'assets/imagens/icon-pc.png'
    },
    {
      id: 2,
      titulo: 'Ar-Condicionado',
      descricao: '3 ar-condicionados para salas de aula',
      custo: 3000,
      icone: 'assets/imagens/icon-arcondicionado.png'
    },
    {
      id: 3,
      titulo: 'Material de Laboratório',
      descricao: 'Kit completo de ciências',
      custo: 6000,
      icone: 'assets/imagens/icon-lab.png'
    },
    {
      id: 4,
      titulo: 'Livros Didáticos',
      descricao: '100 livros para biblioteca',
      custo: 4000,
      icone: 'assets/imagens/icon-livros.png'
    }
  ];

  ngOnInit() {
    this.carregarPontos();
  }

  carregarPontos() {
    const id = sessionStorage.getItem('idEscola');
    if (id) {
      this.service.getDashboard(+id).subscribe(dados => {
        this.pontosAtuais = dados.pontos;
      });
    }
  }

  resgatar(item: any) {
    if (this.pontosAtuais >= item.custo) {
      if (confirm(`Deseja resgatar "${item.titulo}" por ${item.custo} pontos?`)) {
        alert('Solicitação enviada com sucesso!');
        // TODO: Chamar Backend para descontar os pontos
        // this.service.resgatarRecompensa(item.id)...
      }
    }
  }
}
