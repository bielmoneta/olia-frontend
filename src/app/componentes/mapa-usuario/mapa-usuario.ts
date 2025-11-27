import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { latLng, tileLayer, icon, Map, Marker } from 'leaflet';
import { EscolaService } from '../../services/escola.service';
import { ModalDoacao } from '../modal-doacao/modal-doacao';
import { DoacaoService } from '../../services/doacao.service';
import { UsuarioService } from '../../services/usuario.service';
import { DadosCadastroEscola } from '../../modelos-java/dados-escola';

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
  private doacaoService = inject(DoacaoService);
  private usuarioService = inject(UsuarioService);
  private map: any;

  // Coordenadas do Usuário (começa null)
  userLat: number | null = null;
  userLng: number | null = null;

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
    // Primeiro descobrimos onde o usuário mora
    this.geocodificarUsuario();
  }

  geocodificarUsuario() {
    const idUsuario = sessionStorage.getItem('idUsuario');
    if (!idUsuario) {
      this.carregarEscolas(); // Se não tiver logado, carrega sem distância
      return;
    }

    this.usuarioService.detalhar(+idUsuario).subscribe((usuario) => {
      const enderecoUser = `${usuario.endereco.logradouro}, ${usuario.endereco.cidade}`;

      this.service.buscarCoordenadas(enderecoUser).subscribe((geo: any) => {
        if (geo && geo.length > 0) {
          this.userLat = geo[0].lat;
          this.userLng = geo[0].lon;
        }
        // Só carrega as escolas depois de saber onde o usuário está
        this.carregarEscolas();
      });
    });
  }

  carregarEscolas() {
    this.escolas = [];

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

              // --- CÁLCULO DA DISTÂNCIA ---
              if (this.userLat && this.userLng) {
                // Cria pontos Leaflet
                const pontoUsuario = L.latLng(this.userLat, this.userLng);
                const pontoEscola = L.latLng(escola.lat, escola.lng);

                // Calcula metros e converte para KM
                const distMetros = pontoUsuario.distanceTo(pontoEscola);
                escola.distancia = (distMetros / 1000).toFixed(1) + ' km';
              } else {
                escola.distancia = '-- km';
              }

              if (!escola.horario) {
                escola.horario = 'Horário não informado';
              }

              // Formata a capacidade (PEQUENA -> Pequena (até 50L))
              escola.capacidadeTexto = this.formatarCapacidade(escola.capacidade);

              // Define uma porcentagem inicial (Mock)
              escola.percentual = Math.floor(Math.random() * 80);

              //Verifica se já existe uma escola com esse ID na lista visual
              const jaExiste = this.escolas.some((e) => e.id === escola.id);
              if (!jaExiste) {
                this.escolas.push(escola);
                this.adicionarPinoNoMapa(escola);
              }
            }
          });
        });
      },
      error: (err) => console.error('Erro ao listar escolas', err),
    });
  }

  formatarCapacidade(enumValor: string): string {
    switch (enumValor) {
      case 'PEQUENA':
        return 'Pequena (até 50L)';
      case 'MEDIA':
        return 'Média (até 100L)';
      case 'GRANDE':
        return 'Grande (acima de 200L)';
      default:
        return enumValor;
    }
  } // <--- Faltava fechar essa chave

  // Adiciona o pino e o Popup com botão
  adicionarPinoNoMapa(escola: any) {
    if (this.map) {
      L.marker([escola.lat, escola.lng], { icon: this.pinVerde }).addTo(this.map).bindPopup(`
           <strong>${escola.nome}</strong><br>
           ${escola.endereco.logradouro}<br>
           <br>
           <button style="background:#689f38; color:white; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;"
             onclick="document.dispatchEvent(new CustomEvent('abrirDoacao', {detail: ${JSON.stringify(
               escola
             ).replace(/"/g, '&quot;')}}))">
             Doar Aqui
           </button>
        `);
    }
  }

  onMapReady(map: any) {
    this.map = map;
    this.carregarEscolas();
  }

  centralizarNoMapa(escola: any) {
    if (escola.lat && escola.lng) {
      this.map.flyTo([escola.lat, escola.lng], 16);
    }
  }

  abrirDoacao(escola: any) {
    this.escolaSelecionada = escola;
    this.modalAberto = true;
  }

  fecharModal() {
    this.modalAberto = false;
  }

  salvarDoacaoPendente(dadosDoacao: any) {
    // Chama o Backend para salvar no banco
    this.doacaoService.doar(dadosDoacao).subscribe({
      next: () => {
        alert('Doação confirmada!');
        this.fecharModal();
      },
      error: (erro) => {
        console.error('Erro ao salvar doação', erro);
        alert('Erro ao registrar doação.');
      },
    });
  }
}
