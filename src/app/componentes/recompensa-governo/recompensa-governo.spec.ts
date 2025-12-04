import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecompensaGoverno } from './recompensa-governo';

describe('RecompensaGoverno', () => {
  let component: RecompensaGoverno;
  let fixture: ComponentFixture<RecompensaGoverno>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecompensaGoverno]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecompensaGoverno);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
