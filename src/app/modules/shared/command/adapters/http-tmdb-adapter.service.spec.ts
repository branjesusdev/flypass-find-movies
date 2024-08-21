import { TestBed } from '@angular/core/testing';

import { HttpTmdbAdapterService } from './http-tmdb-adapter.service';
import { HttpClient } from '@angular/common/http';

describe('HttpTmdbAdapterService', () => {
  let service: HttpTmdbAdapterService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      imports: [],
      providers: [HttpTmdbAdapterService, { provide: HttpClient, useValue: spy }],
    });

    service = TestBed.inject(HttpTmdbAdapterService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
