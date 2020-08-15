import { TestBed } from '@angular/core/testing';

import { NyelvService } from './nyelv.service';

describe('NyelvService', () => {
  let service: NyelvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NyelvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
