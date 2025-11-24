import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { latLng, tileLayer, icon, Map, Marker } from 'leaflet';
import { EscolaService } from '../../services/escola.service';
import { ModalDoacao } from '../modal-doacao/modal-doacao';

// Declara o L global para usar nos popups e rotas
declare const L: any;

@Component({
  selector: 'app-mapa-usuario',
  standalone: true,
  // 2. Adicione o Modal nos imports
  imports: [CommonModule, LeafletModule, ModalDoacao],
  templateUrl: './mapa-usuario.html',
  styleUrl: './mapa-usuario.css',
})
export class MapaUsuario implements OnInit {
  private service = inject(EscolaService);
  private map: any;

  escolas: any[] = [];

  // Variáveis do Modal
  modalAberto = false;
  escolaSelecionada: any = null;

  pinVerde = icon({
    iconUrl: 'assets/imagens/icon-pinvermelho.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });

  // Configuração do Mapa
  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap',
      }),
    ],
    zoom: 13,
    center: latLng(-8.05428, -34.8813),
  };

  constructor() {
    // 3. "Gambiarra" técnica necessária:
    // Como o botão do Popup é HTML puro, ele não conhece o Angular.
    // Nós escutamos o evento 'abrirDoacao' que criamos no HTML do popup.
    document.addEventListener('abrirDoacao', (event: any) => {
      // O 'ngZone' seria ideal aqui, mas assim funciona para casos simples
      this.abrirDoacao(event.detail);
    });
  }

  ngOnInit() {
    this.carregarEscolas();
  }

  carregarEscolas() {
    this.service.listar().subscribe({
      next: (listaDoJava) => {
        listaDoJava.forEach((escola: any) => {
          // Monta o endereço
          const enderecoCompleto = `${escola.endereco.logradouro}, ${escola.endereco.bairro}, ${escola.endereco.cidade}`;

          // Busca coordenadas (Geocoding)
          this.service.buscarCoordenadas(enderecoCompleto).subscribe((geo: any) => {
            if (geo && geo.length > 0) {
              escola.lat = geo[0].lat;
              escola.lng = geo[0].lon;

              // Dados complementares
              escola.distancia = '2.5 km'; // (Mock)
              escola.horario = '08h - 17h'; // (Ideal vir do banco)

              // Formata a capacidade (PEQUENA -> Pequena (até 50L))
              escola.capacidadeTexto = this.formatarCapacidade(escola.capacidade);

              // Define uma porcentagem inicial (Mock)
              escola.percentual = Math.floor(Math.random() * 80);

              this.escolas.push(escola);
              this.adicionarPinoNoMapa(escola);
            }
          });
        });
      },
      error: (err) => console.error('Erro ao listar escolas', err),
    });
  }

  formatarCapacidade(enumValor: string): string {
    switch (enumValor) {
      case 'PEQUENA': return 'Pequena (até 50L)';
      case 'MEDIA': return 'Média (até 100L)';
      case 'GRANDE': return 'Grande (acima de 200L)';
      default: return enumValor;
    }
  } // <--- Faltava fechar essa chave

  // Adiciona o pino e o Popup com botão
  adicionarPinoNoMapa(escola: any) {
    if (this.map) {
      L.marker([escola.lat, escola.lng], { icon: this.pinVerde })
        .addTo(this.map)
        .bindPopup(`
           <strong>${escola.nome}</strong><br>
           ${escola.endereco.logradouro}<br>
           <br>
           <button style="background:#689f38; color:white; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;"
             onclick="document.dispatchEvent(new CustomEvent('abrirDoacao', {detail: ${JSON.stringify(escola).replace(/"/g, '&quot;')}}))">
             Doar Aqui
           </button>
        `);
    }
  }

  onMapReady(map: any) {
    this.map = map;
  }

  centralizarNoMapa(escola: any) {
    if (escola.lat && escola.lng) {
      this.map.flyTo([escola.lat, escola.lng], 16);
    }
  }

  // --- LÓGICA DO MODAL ---

  abrirDoacao(escola: any) {
    this.escolaSelecionada = escola;
    this.modalAberto = true;
  }

  fecharModal() {
    this.modalAberto = false;
  }

  salvarDoacaoPendente(dadosDoacao: any) {
    const historicoAtual = JSON.parse(localStorage.getItem('historicoDoacoes') || '[]');
    historicoAtual.unshift(dadosDoacao);
    localStorage.setItem('historicoDoacoes', JSON.stringify(historicoAtual));

    this.fecharModal();
    alert('Código gerado! Verifique seu histórico.');
  }
}
