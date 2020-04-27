import { TestBed } from '@angular/core/testing';

import { ForditoService } from './fordito.service';

describe('ForditoService', () => {
  let service: ForditoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForditoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
