import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GovernoService {
  private http = inject(HttpClient);
  private apiUrlLogin = 'https://olia-backend-production.up.railway.app/login/governo';
  private apiUrlGoverno = 'https://olia-backend-production.up.railway.app/governo';

  fazerLogin(dados: { email: string; senha: string }): Observable<any> {
    return this.http.post(this.apiUrlLogin, dados);
  }

  getImpactoGlobal(): Observable<any> {
    return this.http.get(`${this.apiUrlGoverno}/impacto`);
  }
}
