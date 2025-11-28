import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoEscola } from './historico-escola';

describe('HistoricoEscola', () => {
  let component: HistoricoEscola;
  let fixture: ComponentFixture<HistoricoEscola>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoricoEscola]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricoEscola);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
