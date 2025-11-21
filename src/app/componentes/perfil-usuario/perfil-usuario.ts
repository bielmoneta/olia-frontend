import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-perfil-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil-usuario.html',
  styleUrl: './perfil-usuario.css',
})
export class PerfilUsuario {
 private service = inject(UsuarioService);

  // Objeto vazio para começar
  usuario: any = {
    id: null,
    nome: '',
    email: '',
    endereco: { logradouro: '', bairro: '', cidade: '' },
    telefone: '',
    numeroNis: ''
  };

  // Métricas (ainda mockadas, pois não temos endpoint para isso ainda)
  metricas = { oleoReciclado: 12.5, co2Evitado: 25, saboesRecebidos: 1 };
  metaProximaRecompensa = 10;
  progressoAtual = 5;

  get porcentagemProgresso(): string {
    const porcentagem = (this.progressoAtual / this.metaProximaRecompensa) * 100;
    return `${porcentagem}%`;
  }

  modoEdicao = false;

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {
    // 1. Pega o ID que salvamos no Login
    const id = sessionStorage.getItem('idUsuario');

    if (id) {
      // 2. Busca no Java
      this.service.detalhar(+id).subscribe({
        next: (dadosDoBanco) => {
          this.usuario = dadosDoBanco;
          // Ajuste se o Java mandar 'numeroNis' e o front usar 'nis'
        },
        error: (erro) => console.error('Erro ao carregar perfil', erro)
      });
    }
  }

  alternarEdicao() {
    if (this.modoEdicao) {
      this.salvarNoBanco();
    }
    this.modoEdicao = !this.modoEdicao;
  }

  salvarNoBanco() {
    // 3. Envia para o Java atualizar
    this.service.atualizar(this.usuario).subscribe({
      next: (dadosAtualizados) => {
        alert('Perfil atualizado com sucesso!');
        this.usuario = dadosAtualizados; // Atualiza a tela com a resposta
      },
      error: (erro) => {
        alert('Erro ao atualizar.');
        console.error(erro);
      }
    });
  }
}
