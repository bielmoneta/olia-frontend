import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEscola } from './dashboard-escola';

describe('DashboardEscola', () => {
  let component: DashboardEscola;
  let fixture: ComponentFixture<DashboardEscola>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardEscola]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardEscola);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
