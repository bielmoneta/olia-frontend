import { Routes } from '@angular/router';
import { Inicio } from './componentes/inicio/inicio';
import { LoginUsuario } from './componentes/login-usuario/login-usuario';
import { CadastroUsuario } from './componentes/cadastro-usuario/cadastro-usuario';
import { MapaUsuario } from './componentes/mapa-usuario/mapa-usuario';
import { HistoricoUsuario } from './componentes/historico-usuario/historico-usuario';
import { RecompensaUsuario } from './componentes/recompensa-usuario/recompensa-usuario';
import { PerfilUsuario } from './componentes/perfil-usuario/perfil-usuario';
import { LoginEscola } from './componentes/login-escola/login-escola';
import { CadastroEscola } from './componentes/cadastro-escola/cadastro-escola';
import { DashboardEscola } from './componentes/dashboard-escola/dashboard-escola';
import { RecompensasEscolaComponent } from './componentes/recompensa-escola/recompensa-escola';
import { HistoricoEscola } from './componentes/historico-escola/historico-escola';
import { LoginGoverno } from './componentes/login-governo/login-governo';

export const routes: Routes = [
  {path: '', component: Inicio  },
  {path: 'login-usuario', component: LoginUsuario },
  {path: 'cadastro-usuario', component: CadastroUsuario },
  {path: 'mapa-usuario', component: MapaUsuario },
  {path: 'historico-usuario', component: HistoricoUsuario},
  {path: 'recompensa-usuario', component: RecompensaUsuario },
  {path: 'perfil-usuario', component: PerfilUsuario },
  {path: 'login-escola', component: LoginEscola },
  {path: 'cadastro-escola', component: CadastroEscola },
  {path: 'dashboard-escola', component: DashboardEscola},
  {path: 'recompensa-escola', component: RecompensasEscolaComponent},
  {path: 'historico-escola', component: HistoricoEscola},
  {path: 'login-governo', component: LoginGoverno },
];
