import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { DoacaoService } from '../../services/doacao.service';

@Component({
  selector: 'app-perfil-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil-usuario.html',
  styleUrl: './perfil-usuario.css',
})
export class PerfilUsuario implements OnInit {

  private usuarioService = inject(UsuarioService);
  private doacaoService = inject(DoacaoService);

  // Objeto vazio para começar
  usuario: any = {
    nome: '',
    email: '',
    endereco: { logradouro: '', bairro: '', cidade: '' },
    telefone: '',
    numeroNis: '',
  };

  stats = {
    totalLitros: 0,
    totalPontos: 0,
    aguaPoupada: 0,
    saboesGanhos: 0,
  };

  // Barra de Progresso
  metaPontos = 100; // Meta para ganhar 1 sabão
  pontosAtuais = 0; // Pontos acumulados na rodada atual

  get porcentagemProgresso(): string {
    const pct = (this.pontosAtuais / this.metaPontos) * 100;
    return `${pct}%`;
  }

  modoEdicao = false;

  ngOnInit() {
    this.carregarDadosUsuario();
    this.calcularImpacto();
  }

  carregarDadosUsuario() {
    const id = sessionStorage.getItem('idUsuario');
    if (id) {
      this.usuarioService.detalhar(+id).subscribe({
        next: (dados) => (this.usuario = dados),
        error: (err) => console.error(err),
      });
    }
  }

  calcularImpacto() {
    const id = sessionStorage.getItem('idUsuario');
    if (!id) return;

    this.doacaoService.listarPorUsuario(+id).subscribe({
      next: (listaDoacoes) => {
        // Somar apenas doações CONFIRMADAS
        // O backend manda string "10L"
        let litros = 0;

        listaDoacoes.forEach((d: any) => {
          if (d.status === 'CONFIRMADO' || d.status === 'Confirmado') {
          // Remove o "L" e transforma em número
          const qtdNumerica = parseFloat(d.quantidade.replace('L', ''));
          // Soma apenas se for um número válido
          if (!isNaN(qtdNumerica)) {
            litros += qtdNumerica;
          }
        }
        });

        // Atualiza as estatísticas
        this.stats.totalLitros = litros;
        this.stats.totalPontos = litros * 10; // Regra: 1L = 10 pts

        // 1 Litro de óleo contamina 25.000 Litros de água
        this.stats.aguaPoupada = litros * 25000;

        // Calcula Sabões (Divisão inteira dos pontos)
        this.stats.saboesGanhos = Math.floor(this.stats.totalPontos / this.metaPontos);

        // Calcula a Barra (O resto da divisão)
        // Ex: Se tem 150 pontos, ganhou 1 sabão e sobrou 50 pontos na barra.
        this.pontosAtuais = this.stats.totalPontos % this.metaPontos;
      },
    });
  }

  alternarEdicao() {
    if (this.modoEdicao) {
      this.salvarNoBanco();
    }
    this.modoEdicao = !this.modoEdicao;
  }

  salvarNoBanco() {
    // 3. Envia para o Java atualizar
    this.usuarioService.atualizar(this.usuario).subscribe({
      next: (dadosAtualizados) => {
        alert('Perfil atualizado com sucesso!');
        this.usuario = dadosAtualizados; // Atualiza a tela com a resposta
      },
      error: (erro) => {
        alert('Erro ao atualizar.');
        console.error(erro);
      },
    });
  }
}
