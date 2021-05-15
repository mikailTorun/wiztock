import { TestBed } from '@angular/core/testing';

import { AjaxRequestService } from './ajax-request.service';

describe('AjaxRequestService', () => {
  let service: AjaxRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AjaxRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
