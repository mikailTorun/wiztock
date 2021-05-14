import { TestBed } from '@angular/core/testing';

import { SilService } from './sil.service';

describe('SilService', () => {
  let service: SilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
