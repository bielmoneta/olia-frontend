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
}
