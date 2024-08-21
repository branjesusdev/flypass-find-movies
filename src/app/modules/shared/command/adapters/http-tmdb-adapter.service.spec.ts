import { TestBed } from '@angular/core/testing';

import { HttpTmdbAdapterService } from './http-tmdb-adapter.service';

describe('HttpTmdbAdapterService', () => {
  let service: HttpTmdbAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpTmdbAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
