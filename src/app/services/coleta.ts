import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ColetaService {
  private http = inject(HttpClient);
  private API = 'http://localhost:8080/coletas';

  // Função para pegar o token e criar o cabeçalho de autorização
  private getAuthHeaders() {
    const token = sessionStorage.getItem('token'); // <- Verifique se o nome da chave 'token' está correto

    // Adicione esta linha para depuração
    console.log('Token enviado na requisição:', token);

    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  listarTodas(): Observable<any[]> {
    return this.http.get<any[]>(this.API, { headers: this.getAuthHeaders() });
  }

  mudarStatus(id: number, novoStatus: string): Observable<any> {
    const url = `${this.API}/${id}/status`;
    // O backend espera um objeto, mesmo que seja apenas o status.
    const body = { status: novoStatus };
    return this.http.put(url, body, { headers: this.getAuthHeaders() });
  }

  solicitar(dados: any): Observable<any> {
    return this.http.post(this.API, dados, { headers: this.getAuthHeaders() });
  }
}
