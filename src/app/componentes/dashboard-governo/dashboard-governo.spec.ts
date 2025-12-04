import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardGoverno } from './dashboard-governo';

describe('DashboardGoverno', () => {
  let component: DashboardGoverno;
  let fixture: ComponentFixture<DashboardGoverno>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardGoverno]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardGoverno);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
