import { TestBed } from '@angular/core/testing';

import { Governo } from './governo';

describe('Governo', () => {
  let service: Governo;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Governo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
