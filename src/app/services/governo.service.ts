import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GovernoService {
  private http = inject(HttpClient);
  private apiUrlLogin = 'http://localhost:8080/login/governo';
  private apiUrlGoverno = 'http://localhost:8080/governo';

  fazerLogin(dados: { email: string; senha: string }): Observable<any> {
    return this.http.post(this.apiUrlLogin, dados);
  }

  getImpactoGlobal(): Observable<any> {
    return this.http.get(`${this.apiUrlGoverno}/impacto`);
  }
}
