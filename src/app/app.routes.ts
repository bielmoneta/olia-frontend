import { Routes } from '@angular/router';
import { Inicio } from './componentes/inicio/inicio';
import { LoginUsuario } from './componentes/login-usuario/login-usuario';
import { CadastroUsuario } from './componentes/cadastro-usuario/cadastro-usuario';
import { MapaUsuario } from './componentes/mapa-usuario/mapa-usuario';

export const routes: Routes = [
  {path: '', component: Inicio  },
  {path: 'login-usuario', component: LoginUsuario },
  { path: 'cadastro-usuario', component: CadastroUsuario },
  { path: 'mapa-usuario', component: MapaUsuario }
];
