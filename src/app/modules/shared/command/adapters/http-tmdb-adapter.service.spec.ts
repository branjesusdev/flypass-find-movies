import { TestBed } from '@angular/core/testing';

import { HttpTmdbAdapterService } from './http-tmdb-adapter.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '@environment';
import { PATHS } from '@conf/paths';

describe('HttpTmdbAdapterService', () => {
  let service: HttpTmdbAdapterService;
  let httpTestingController: HttpTestingController;
  const urlAPI = `${environment.API_BASE_URL}`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [HttpTmdbAdapterService, provideHttpClient(), provideHttpClientTesting()],
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

  it('should get trending', () => {
    service.getTrending().subscribe((res) => {
      expect(res).toBeTruthy();
    });

    const path = PATHS.trending;

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

  it('should get featured movies', () => {
    service.getFeaturedMovies().subscribe((res) => {
      expect(res).toBeTruthy();
    });

    const path = PATHS.movies.featured;

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

  it('should get featured series', () => {
    service.getFeaturedSeries().subscribe((res) => {
      expect(res).toBeTruthy();
    });

    const path = PATHS.series.featured;

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
