import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-recompensa-usuario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recompensa-usuario.html',
  styleUrl: './recompensa-usuario.css',
})
export class RecompensaUsuario {
 private service = inject(UsuarioService);

  // Variáveis de controle
  isElegivel: boolean = false; // Começa falso por segurança
  nisUsuario: string = '';
  carregando: boolean = true; // Para mostrar algo enquanto busca

  // Dados fictícios dos locais (Mock)
  locais = [
    {
      nome: 'Farmácia Popular Centro',
      endereco: 'Av. Central, 100',
      data: '15/10/2025',
      horario: '9h - 16h',
      status: 'Disponível'
    },
    {
      nome: 'Farmácia Popular Jardim',
      endereco: 'Rua do Jardim, 250',
      data: '16/10/2025',
      horario: '8h - 17h',
      status: 'Disponível'
    }
  ];

  ngOnInit() {
    this.buscarDadosUsuario();
  }

  buscarDadosUsuario() {
    const id = sessionStorage.getItem('idUsuario');

    if (id) {
      this.service.detalhar(+id).subscribe({
        next: (dados) => {
          this.isElegivel = dados.temBolsaFamilia;
          this.nisUsuario = dados.numeroNis || 'Não cadastrado';
          this.carregando = false;
        },
        error: (erro) => {
          console.error('Erro ao buscar dados', erro);
          this.carregando = false;
        }
      });
    }
  }

  confirmarRetirada(local: any) {
    alert(`Retirada confirmada em: ${local.nome}`);
  }
}
