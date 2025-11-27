import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgendaColeta } from './modal-agenda-coleta';

describe('ModalAgendaColeta', () => {
  let component: ModalAgendaColeta;
  let fixture: ComponentFixture<ModalAgendaColeta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAgendaColeta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAgendaColeta);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
