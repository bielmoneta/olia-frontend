import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDoacao } from './modal-doacao';

describe('ModalDoacao', () => {
  let component: ModalDoacao;
  let fixture: ComponentFixture<ModalDoacao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalDoacao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDoacao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
