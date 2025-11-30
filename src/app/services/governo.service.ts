import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GovernoService {
  private http = inject(HttpClient);

  // ajuste a url conforme o endpoint real do seu backend
  private apiUrlLogin = 'https://olia-backend-production.up.railway.app/login/governo';

  fazerLogin(dados: { email: string, senha: string }): Observable<any> {
    return this.http.post(this.apiUrlLogin, dados);
  }
}
