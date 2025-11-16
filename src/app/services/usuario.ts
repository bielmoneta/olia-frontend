import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'http://localhost:8080/usuarios'; // coloque sua URL aqui

  constructor(private http: HttpClient) {}

  // GET
  listarUsuarios(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // GET por ID
  buscarPorId(id: string | number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // POST
  cadastrarUsuario(usuario: any): Observable<any> {
    return this.http.post(this.apiUrl, usuario);
  }

  // PUT
  atualizarUsuario(id: number, usuario: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, usuario);
  }

  // DELETE
  deletarUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
