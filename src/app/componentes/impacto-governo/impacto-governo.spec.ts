import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpactoGoverno } from './impacto-governo';

describe('ImpactoGoverno', () => {
  let component: ImpactoGoverno;
  let fixture: ComponentFixture<ImpactoGoverno>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImpactoGoverno]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImpactoGoverno);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
