import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingEscola } from './ranking-escola';

describe('RankingEscola', () => {
  let component: RankingEscola;
  let fixture: ComponentFixture<RankingEscola>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RankingEscola]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RankingEscola);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
