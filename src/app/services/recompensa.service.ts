import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecompensaService {

  private http = inject(HttpClient);
  private readonly apiUrlRecompensa = 'https://olia-backend-production.up.railway.app/recompensas';

  // Lista todos os prêmios ativos (Para Escola e Governo)
  listarTodas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlRecompensa);
  }

  // Cria um novo prêmio (Governo)
  cadastrar(dados: any): Observable<void> {
    return this.http.post<void>(this.apiUrlRecompensa, dados);
  }

  // Edita um prêmio existente (Governo)
  editar(dados: any): Observable<void> {
    return this.http.put<void>(this.apiUrlRecompensa, dados);
  }

  // Escola pede um prêmio
  solicitar(idRecompensa: number, idEscola: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrlRecompensa}/solicitar`, { idRecompensa, idEscola });
  }

  // Governo vê os pedidos
  listarSolicitacoes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrlRecompensa}/solicitacoes`);
  }

  // Governo aprova
  aprovar(idSolicitacao: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrlRecompensa}/solicitacoes/${idSolicitacao}/aprovar`, {});
  }

  // Governo nega
  negar(idSolicitacao: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrlRecompensa}/solicitacoes/${idSolicitacao}/negar`, {});
  }
}
