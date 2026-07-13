import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { JourneyService } from './journey';

describe('JourneyService', () => {
  let service: JourneyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(JourneyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
