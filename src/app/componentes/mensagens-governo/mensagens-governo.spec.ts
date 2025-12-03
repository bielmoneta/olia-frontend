import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensagensGoverno } from './mensagens-governo';

describe('MensagensGoverno', () => {
  let component: MensagensGoverno;
  let fixture: ComponentFixture<MensagensGoverno>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MensagensGoverno]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MensagensGoverno);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
