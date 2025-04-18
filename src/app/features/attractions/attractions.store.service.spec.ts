import { TestBed } from '@angular/core/testing';

import { AttractionsStoreService } from './attractions.store.service';

describe('AttractionsStoreService', () => {
  let service: AttractionsStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttractionsStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
