import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DadosCadastroEscola } from '../modelos-java/dados-escola';

@Injectable({ providedIn: 'root' })
export class EscolaService {
  private http = inject(HttpClient);
  private apiUrlLoginEscola = 'http://localhost:8080/login/escola';
  private apiUrlEscola = 'http://localhost:8080/escolas';

  cadastrar(dados: DadosCadastroEscola): Observable<any> {
    return this.http.post(this.apiUrlEscola, dados);
  }

  fazerLogin(dados: {email: string, senha: string}): Observable<any> {
    return this.http.post(this.apiUrlLoginEscola, dados);
  }
}
