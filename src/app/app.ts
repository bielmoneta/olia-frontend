import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Cabecalho } from "./componentes/cabecalho/cabecalho";
import { Inicio } from "./componentes/inicio/inicio";
import { Rodape } from "./componentes/rodape/rodape";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Cabecalho, Inicio, Rodape],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('OLIA-Frontend');
}
