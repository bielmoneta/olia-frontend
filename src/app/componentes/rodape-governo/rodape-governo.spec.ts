import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RodapeGoverno } from './rodape-governo';

describe('RodapeGoverno', () => {
  let component: RodapeGoverno;
  let fixture: ComponentFixture<RodapeGoverno>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RodapeGoverno]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RodapeGoverno);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
