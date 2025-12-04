import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalValidacaoDoacao } from './modal-validacao-doacao';

describe('ModalValidacaoDoacao', () => {
  let component: ModalValidacaoDoacao;
  let fixture: ComponentFixture<ModalValidacaoDoacao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalValidacaoDoacao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalValidacaoDoacao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
