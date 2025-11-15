import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-login-usuario',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login-usuario.html',
  styleUrl: './login-usuario.css',
})
export class LoginUsuario {
  private router = inject(Router);

  fazerLogin() {
    sessionStorage.setItem('usuarioLogado', 'true');
    sessionStorage.setItem('nomeUsuario', 'gabriel')
    this.router.navigate(['/mapa-usuario']);
  }
}
