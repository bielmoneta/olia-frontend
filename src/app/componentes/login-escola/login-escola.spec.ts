import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginEscola } from './login-escola';

describe('LoginEscola', () => {
  let component: LoginEscola;
  let fixture: ComponentFixture<LoginEscola>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginEscola]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginEscola);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
