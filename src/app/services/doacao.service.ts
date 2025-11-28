import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DoacaoService {
  private http = inject(HttpClient);
  private apiDoacao = 'http://localhost:8080/doacoes';

  // Método para cadastrar
  doar(dados: any): Observable<any> {
    return this.http.post(this.apiDoacao, dados);
  }

  listarPorUsuario(idUsuario: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiDoacao}/usuario/${idUsuario}`);
  }

  // Listar histórico da escola
  listarPorEscola(idEscola: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiDoacao}/escola/${idEscola}`);
  }

  confirmarRecebimento(dados: { idDoacao: number; quantidadeReal: number }): Observable<void> {
    return this.http.put<void>(`${this.apiDoacao}/confirmar`, dados);
  }
}
