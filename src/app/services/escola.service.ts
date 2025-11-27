import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
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

  listar() {
    // O Java retorna um objeto Page { content: [...] }
    // Usamos o pipe(map) para pegar só a lista que está dentro do 'content'
    return this.http.get<any>(this.apiUrlEscola).pipe(
      map(resposta => resposta.content)
    );
  }

  // Método auxiliar para transformar Endereço em Coordenadas (Geocoding)
  buscarCoordenadas(endereco: string): Observable<any> {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(endereco)}`;
    return this.http.get(url);
  }

  getDashboard(idEscola: number): Observable<any> {
    return this.http.get(`${this.apiUrlEscola}/dashboard/${idEscola}`);
  }
}
