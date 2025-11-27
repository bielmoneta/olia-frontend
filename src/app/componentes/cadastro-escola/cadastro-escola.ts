import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { EscolaService } from '../../services/escola.service';
import { DadosCadastroEscola } from '../../modelos-java/dados-escola';

@Component({
  selector: 'app-cadastro-escola',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxMaskDirective],
  templateUrl: './cadastro-escola.html',
  styleUrl: './cadastro-escola.css',
})
export class CadastroEscola {

  private service = inject(EscolaService);
  private router = inject(Router);

  confirmarSenha = '';

  escola: DadosCadastroEscola = {
    nome: '',
    cnpj: '',
    codigo_inep: '',
    endereco: { logradouro: '', bairro: '', cidade: '' },
    capacidade: '',
    nome_responsavel: '',
    telefone: '',
    horario: '',
    email: '',
    email_acesso: '',
    senha: ''
  };

  cadastrar() {
    if (this.escola.senha !== this.confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    this.service.cadastrar(this.escola).subscribe({
      next: () => {
        alert('Escola cadastrada com sucesso!');
        this.router.navigate(['/login-escola']);
      },
      error: (erro) => {
        console.error(erro);
        alert('Erro ao cadastrar escola. Verifique os dados.');
      }
    });
  }
}
