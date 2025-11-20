import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecompensaUsuario } from './recompensa-usuario';

describe('RecompensaUsuario', () => {
  let component: RecompensaUsuario;
  let fixture: ComponentFixture<RecompensaUsuario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecompensaUsuario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecompensaUsuario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
