import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRecompensa } from './modal-recompensa';

describe('ModalRecompensa', () => {
  let component: ModalRecompensa;
  let fixture: ComponentFixture<ModalRecompensa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalRecompensa]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalRecompensa);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
