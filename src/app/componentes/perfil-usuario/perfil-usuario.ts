import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfil-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil-usuario.html',
  styleUrl: './perfil-usuario.css',
})
export class PerfilUsuario {
  // Dados do Usuário (Mock)
  usuario = {
    nome: 'Maria Silva',
    email: 'maria.silva@email.com',
    endereco: 'Rua das Flores, 123 - Centro',
    nis: 'SIM123456'
  };
  // Métricas de Impacto
  metricas = {
    oleoReciclado: 12.5, // Litros
    co2Evitado: 25,      // Kg
    saboesRecebidos: 1
  };
  // Lógica da Barra de Progresso
  metaProximaRecompensa = 10; // A cada 10L ganha um sabão
  progressoAtual = 12.5; // Quanto já doou

  // Calcula a porcentagem para a barra CSS (ex: 83%)
  get porcentagemProgresso(): string {
    const porcentagem = (this.progressoAtual / this.metaProximaRecompensa) * 100;
    return `${porcentagem}%`;
  }

  // Controle de Edição
  modoEdicao = false; // Começa apenas visualizando

  alternarEdicao() {
    if (this.modoEdicao) {
      // Se estava editando e clicou em "Salvar"
      console.log('Salvando dados...', this.usuario);
      // TODO: Chamar backend
    }
    this.modoEdicao = !this.modoEdicao;
  }
}
