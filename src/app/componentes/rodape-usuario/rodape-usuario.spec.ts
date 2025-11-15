import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RodapeUsuario } from './rodape-usuario';

describe('RodapeUsuario', () => {
  let component: RodapeUsuario;
  let fixture: ComponentFixture<RodapeUsuario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RodapeUsuario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RodapeUsuario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
