import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginGoverno } from './login-governo';

describe('LoginGoverno', () => {
  let component: LoginGoverno;
  let fixture: ComponentFixture<LoginGoverno>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginGoverno]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginGoverno);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
