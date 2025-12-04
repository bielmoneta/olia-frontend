import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario.service';
import { DadosCadastroUsuario } from '../../modelos-java/dados-cadastro-usuario';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-cadastro-usuario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  templateUrl: './cadastro-usuario.html',
  styleUrl: './cadastro-usuario.css',
  providers: [provideNgxMask()]
})
export class CadastroUsuario {
  private service = inject(UsuarioService);
  private router = inject(Router);

  usuario: DadosCadastroUsuario ={
    nome: '',
    cpf: '',
    telefone: '',
    endereco: {
      logradouro: '',
      bairro: '',
      cidade: '',
    },
    temBolsaFamilia: false,
    numeroNis: '',
    email: '',
    senha: ''
  };
  confirmarSenha = '';

  cadastrar() {
    // Se o usuário não tem bolsa família, garantimos que o NIS vai nulo
    // para não dar erro de validação no Java se estiver vazio ""
    if (!this.usuario.temBolsaFamilia) {
      delete this.usuario.numeroNis;
    }

    if (this.usuario.senha !== this.confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    this.service.cadastrar(this.usuario).subscribe({
      next: () => {
        alert('Cadastrado com sucesso!');
        this.router.navigate(['/login-usuario']);
      },
      error: (erro) => {
        console.error(erro);
        alert('Erro ao cadastrar. Verifique os dados.');
      },
    });
  }
}
