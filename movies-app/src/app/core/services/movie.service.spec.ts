import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { AppSettingsService } from './app-settings.service';

import { MovieService } from './movie.service';

describe('MovieService', () => {
  let service: MovieService;

  beforeEach(() => {
     TestBed.configureTestingModule({
      declarations: [MovieService],
      providers: [HttpClient, AppSettingsService],
    })
    .compileComponents();
    service = TestBed.inject(MovieService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
