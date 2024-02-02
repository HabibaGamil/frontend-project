import { TestBed } from '@angular/core/testing';

import { AuthGaurdService } from './auth-gaurd.service';

describe('AuthGaurdService', () => {
  let service: AuthGaurdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthGaurdService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
