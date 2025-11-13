import { Routes } from '@angular/router';
import { Inicio } from './componentes/inicio/inicio';
import { LoginUsuario } from './componentes/login-usuario/login-usuario';

export const routes: Routes = [
  {path: '', component: Inicio},
  {path: 'login-usuario', component: LoginUsuario},
];
