import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { latLng, tileLayer, marker, icon } from 'leaflet';

@Component({
  selector: 'app-mapa-usuario',
  standalone: true,
  imports: [CommonModule, LeafletModule],
  templateUrl: './mapa-usuario.html',
  styleUrl: './mapa-usuario.css',
})
export class MapaUsuario {
  options = {
    layers: [
      // Este é o mapa do OpenStreetMap (gratuito)
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap'
      })
    ],
    zoom: 13,
    center: latLng(-8.05428, -34.8813) // Coordenadas de Recife
  };

  // 5. Nossos PINS (Layers)
  // TODO: No futuro, estes dados virão do seu Backend Java
  layers = [
    // Pin 1 (Escola A)
    marker([-8.0628, -34.8811], {
      icon: icon({
         iconUrl: 'assets/imagens/icon-pinvermelho.png', // O seu ícone verde
         iconSize: [40, 40] // Tamanho do ícone
      })
    }),
    // Pin 2 (Escola B)
    marker([-8.0500, -34.8900], {
      icon: icon({
         iconUrl: 'assets/imagens/icon-pinvermelho.png',
         iconSize: [40, 40]
      })
    })
  ];
}
