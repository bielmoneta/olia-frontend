import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { latLng, tileLayer, marker, icon, Map, Marker } from 'leaflet';

@Component({
  selector: 'app-mapa-usuario',
  standalone: true,
  imports: [CommonModule, LeafletModule],
  templateUrl: './mapa-usuario.html',
  styleUrl: './mapa-usuario.css',
})
export class MapaUsuario {

  // Variável para controlar o mapa via código (para dar zoom/flyTo)
  private map!: Map;

  // 1. DADOS DAS ESCOLAS (MOCK)
  // No futuro, isso virá do seu Backend Java: this.service.listarEscolas()...
  escolas = [
    {
      id: 1,
      nome: 'Escola Estadual Machado de Assis',
      endereco: 'Av. Principal, 456 - Boa Viagem',
      horario: '07h - 18h',
      distancia: '1.2 km',
      capacidade: 92, // Porcentagem cheia
      lat: -8.0628,
      lng: -34.8811
    },
    {
      id: 2,
      nome: 'Escola Municipal Santos Dumont',
      endereco: 'Rua das Flores, 123 - Centro',
      horario: '08h - 17h',
      distancia: '3.5 km',
      capacidade: 45,
      lat: -8.0500,
      lng: -34.8900
    },
    {
      id: 3,
      nome: 'Colégio Aplicação',
      endereco: 'Av. Acadêmica, 900 - Várzea',
      horario: '07h - 20h',
      distancia: '5.0 km',
      capacidade: 10, // Quase vazio
      lat: -8.0400,
      lng: -34.9000
    }
  ];

  // 2. ÍCONE PERSONALIZADO
  pinVerde = icon({
    iconUrl: 'assets/imagens/icon-pinvermelho.png', // Confirme o nome do seu arquivo
    iconSize: [40, 40],
    iconAnchor: [20, 40], // A ponta do pino fica na coordenada exata
    popupAnchor: [0, -40] // O popup abre acima do pino
  });

  // 3. CONFIGURAÇÃO DO MAPA
  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap'
      })
    ],
    zoom: 13,
    center: latLng(-8.05428, -34.8813)
  };

  // 4. GERAR OS PINS AUTOMATICAMENTE
  // Criamos um marcador para cada escola da lista acima
  layers: Marker[] = this.escolas.map(escola => {
    return marker([escola.lat, escola.lng], { icon: this.pinVerde })
      .bindPopup(`
        <strong>${escola.nome}</strong><br>
        ${escola.endereco}<br>
        <br>
        Capacidade: ${escola.capacidade}%
      `);
  });

  // 5. EVENTO: QUANDO O MAPA CARREGA
  onMapReady(map: Map) {
    this.map = map;
  }

  // 6. AÇÃO: CLICAR NA LISTA LATERAL
  centralizarNoMapa(escola: any) {
    // Move o mapa suavemente até a escola clicada
    this.map.flyTo([escola.lat, escola.lng], 16);
  }

  // 7. AÇÃO: CLICAR EM DOAR
  abrirDoacao(escola: any) {
    alert(`Abrindo doação para: ${escola.nome}`);
    // Aqui você vai abrir o Modal de Doação depois
  }
}
