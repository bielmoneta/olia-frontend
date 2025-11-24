import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroEscola } from './cadastro-escola';

describe('CadastroEscola', () => {
  let component: CadastroEscola;
  let fixture: ComponentFixture<CadastroEscola>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroEscola]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroEscola);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
