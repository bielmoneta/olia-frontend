import { App } from './../app';
import { Injectable, inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DadosCadastroUsuario } from '../modelos-java/dados-cadastro-usuario';
import { RespostaLogin } from '../modelos-java/resposta-login-usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService { 
  private http = inject(HttpClient);
  private apiUrl = 'https://olia-backend-production.up.railway.app/usuarios';
  private apiUrlLogin = 'https://olia-backend-production.up.railway.app/login';

// 1. Cadastrar (@PostMapping)
  cadastrar(dados: DadosCadastroUsuario): Observable<any> {
    return this.http.post(this.apiUrl, dados);
  }

  // 2. Listar (@GetMapping)
  listar(): Observable<DadosCadastroUsuario> {
    // O Spring retorna um Page, não uma lista direta
    return this.http.get<DadosCadastroUsuario>(this.apiUrl);
  }

  // 3. Detalhar (@GetMapping("/{id}"))
  detalhar(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // 4. Atualizar (@PutMapping)
  atualizar(dados: any): Observable<any> {
    return this.http.put(this.apiUrl, dados);
  }

  // 5. Excluir (@DeleteMapping("/{id}"))
  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  fazerLogin(dados: {email: string, senha: string}): Observable<any> {
    return this.http.post(this.apiUrlLogin, dados);
  }
}
