import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ResolveFn, RouterStateSnapshot } from '@angular/router';

import { posterDetailResolver } from './poster-detail.resolver';
import { DetailPoster } from '@shared/core/domain/entity';
import { TheMovieDBPort } from '@shared/core/domain/ports/themoviedb-port.class';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('posterDetailResolver', () => {
  let theMovieDBPortSpy: jasmine.SpyObj<TheMovieDBPort>;
  let mockDetails: DetailPoster;

  const executeResolver: ResolveFn<DetailPoster | null> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => posterDetailResolver(...resolverParameters));

  beforeEach(() => {
    const spy = jasmine.createSpyObj('TheMovieDBPort', ['getMovieDetails', 'getSeriesDetails']);
    TestBed.configureTestingModule({
      providers: [{ provide: TheMovieDBPort, useValue: spy }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    theMovieDBPortSpy = TestBed.inject(TheMovieDBPort) as jasmine.SpyObj<TheMovieDBPort>;
    mockDetails = {
      id: 123,
      name: 'Movie 1',
      overview: 'Overview',
      poster_path: 'http://image.com',
      genres: ['Action', 'Adventure'],
      vote_average: 8.5,
      media_type: 'movie',
      release_date: new Date('2021-01-01'),
      runtime: 120,
      popularity: 1000,
      tagline: 'Tagline',
      production_companies: ['Company 1', 'Company 2'],
      production_countries: ['Country 1', 'Country 2'],
      spoken_languages: ['Language 1', 'Language 2'],
      first_air_date: new Date('2021-01-01'),
      number_of_episodes: 10,
      number_of_seasons: 1,
    };
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });

  it('should return movie details when mediaType is "movie"', fakeAsync(() => {
    theMovieDBPortSpy.getMovieDetails.and.returnValue(of(mockDetails));

    const route = { params: { mediaType: 'movie', id: 123 } } as any;
    const state = {} as RouterStateSnapshot;
    executeResolver(route, state);

    tick();

    expect(theMovieDBPortSpy.getMovieDetails).toHaveBeenCalledWith(123);
  }));

  it('should return series details when mediaType is "tv"', () => {
    mockDetails.media_type = 'tv';
    mockDetails.name = 'Series 1';

    theMovieDBPortSpy.getSeriesDetails.and.returnValue(of(mockDetails));

    const route = { params: { mediaType: 'tv', id: 123 } } as any;
    const state = {} as RouterStateSnapshot;
    executeResolver(route, state);

    expect(theMovieDBPortSpy.getSeriesDetails).toHaveBeenCalledWith(123);
  });

  it('should return null when mediaType is not "movie" or "tv"', () => {
    const route = { params: { mediaType: 'invalid', id: 123 } } as any;
    const state = {} as RouterStateSnapshot;
    const result = executeResolver(route, state);

    expect(result).toBeNull();
  });
});
