import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaUsuario } from './mapa-usuario';

describe('MapaUsuario', () => {
  let component: MapaUsuario;
  let fixture: ComponentFixture<MapaUsuario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapaUsuario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapaUsuario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
