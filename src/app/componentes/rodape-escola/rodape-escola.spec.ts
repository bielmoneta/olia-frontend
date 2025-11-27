import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RodapeEscola } from './rodape-escola';

describe('RodapeEscola', () => {
  let component: RodapeEscola;
  let fixture: ComponentFixture<RodapeEscola>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RodapeEscola]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RodapeEscola);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
