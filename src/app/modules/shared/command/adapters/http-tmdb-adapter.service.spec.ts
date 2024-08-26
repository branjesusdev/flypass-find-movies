import { TestBed } from '@angular/core/testing';

import { HttpTmdbAdapterService } from './http-tmdb-adapter.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '@environment';
import { PATHS } from '@conf/paths';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('HttpTmdbAdapterService', () => {
  let service: HttpTmdbAdapterService;
  let httpTestingController: HttpTestingController;
  const urlAPI = `${environment.API_BASE_URL}`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [HttpTmdbAdapterService, provideHttpClient(), provideHttpClientTesting()],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    service = TestBed.inject(HttpTmdbAdapterService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call obserberResponse', () => {
    const object = {
      1: {
        id: 1,
        title: 'Movie 1',
      },
      2: {
        id: 2,
        title: 'Movie 2',
      },
    } as any;

    service['obserberResponse'](object).subscribe((res) => {
      expect(res).toEqual([
        {
          id: 1,
          title: 'Movie 1',
        },
        {
          id: 2,
          title: 'Movie 2',
        },
      ]);
    });
  });

  it('should get trending', () => {
    service.getTrending({ page: 1 }).subscribe((res) => {
      expect(res).toBeTruthy();
    });

    const path = `${PATHS.trending}?page=1`;

    const req = httpTestingController.expectOne(`${path}`);
    expect(req.request.method).toEqual('GET');
    req.flush({
      results: [
        {
          id: 1,
          title: 'Movie 1',
        },
        {
          id: 2,
          title: 'Movie 2',
        },
      ],
    });
  });

  it('should get trending to return store', () => {
    service['store'].saveState$({ key: 'trending', info: [] });
    service.getTrending({ page: 1 }).subscribe((res) => {
      expect(res).toBeTruthy();
    });
  });

  it('should get featured movies', () => {
    service.getFeaturedMovies({ page: 1 }).subscribe((res) => {
      expect(res).toBeTruthy();
    });

    const path = `${PATHS.movies.featured}?page=1`;

    const req = httpTestingController.expectOne(`${path}`);
    expect(req.request.method).toEqual('GET');
    req.flush({
      results: [
        {
          id: 1,
          title: 'Movie 1',
        },
        {
          id: 2,
          title: 'Movie 2',
        },
      ],
    });
  });

  it('should get featured movies to return store', () => {
    service['store'].saveState$({ key: 'featuredMovies', info: [] });
    service.getFeaturedMovies({ page: 1 }).subscribe((res) => {
      expect(res).toBeTruthy();
    });
  });

  it('should get featured series', () => {
    service.getFeaturedSeries({ page: 1 }).subscribe((res) => {
      expect(res).toBeTruthy();
    });

    const path = `${PATHS.series.featured}?page=1`;

    const req = httpTestingController.expectOne(`${path}`);
    expect(req.request.method).toEqual('GET');
    req.flush({
      results: [
        {
          id: 1,
          name: 'Serie 1',
        },
        {
          id: 2,
          name: 'Serie 2',
        },
      ],
    });
  });

  it('should get featured series to return store', () => {
    service['store'].saveState$({ key: 'featuredSeries', info: [] });
    service.getFeaturedSeries({ page: 1 }).subscribe((res) => {
      expect(res).toBeTruthy();
    });
  });

  it('should get searchMovies movies', () => {
    service.searchMovies('query').subscribe((res) => {
      expect(res).toBeTruthy();
    });

    const path = `${PATHS.search}?query=query&include_adult=false`;

    const req = httpTestingController.expectOne(`${path}`);
    expect(req.request.method).toEqual('GET');
    req.flush({
      results: [
        {
          id: 1,
          title: 'Movie 1',
          media_type: 'movie',
        },
        {
          id: 2,
          title: 'Movie 2',
          media_type: 'movie',
        },
      ],
    });
  });

  it('should get searchMovies series', () => {
    service.searchMovies('query').subscribe((res) => {
      expect(res).toBeTruthy();
    });

    const path = `${PATHS.search}?query=query&include_adult=false`;

    const req = httpTestingController.expectOne(`${path}`);
    expect(req.request.method).toEqual('GET');
    req.flush({
      results: [
        {
          id: 1,
          name: 'Serie 1',
          media_type: 'tv',
        },
        {
          id: 2,
          name: 'Serie 2',
          media_type: 'tv',
        },
      ],
    });
  });

  it('should get movie details', () => {
    const movieId = 1;

    service.getMovieDetails(movieId).subscribe((res) => {
      expect(res).toBeTruthy();
    });

    const path = `${PATHS.movies.details(movieId)}`;

    const req = httpTestingController.expectOne(`${path}`);
    expect(req.request.method).toEqual('GET');
    req.flush({
      id: 1,
      title: 'Movie 1',
      genres: [
        {
          name: 'genre 1',
        },
      ],
      production_companies: [
        {
          name: 'company 1',
        },
      ],
      production_countries: [
        {
          name: 'country 1',
        },
      ],
      spoken_languages: [
        {
          name: 'language 1',
        },
      ],
    });
  });

  it('should get serie details', () => {
    const serieId = 1;

    service.getSeriesDetails(serieId).subscribe((res) => {
      expect(res).toBeTruthy();
    });

    const path = `${PATHS.series.details(serieId)}`;

    const req = httpTestingController.expectOne(`${path}`);
    expect(req.request.method).toEqual('GET');
    req.flush({
      id: 1,
      name: 'Serie 1',
      genres: [
        {
          name: 'genre 1',
        },
      ],
      production_companies: [
        {
          name: 'company 1',
        },
      ],
      production_countries: [
        {
          name: 'country 1',
        },
      ],
      spoken_languages: [
        {
          name: 'language 1',
        },
      ],
    });
  });
});
