import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecompensaEscola } from './recompensa-escola';

describe('RecompensaEscola', () => {
  let component: RecompensaEscola;
  let fixture: ComponentFixture<RecompensaEscola>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecompensaEscola]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecompensaEscola);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
