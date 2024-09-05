import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnbordingFeaturedComponent } from './onbording-featured.component';
import { TheMovieDBPort } from '@shared/core/domain/ports/themoviedb-port.class';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MediaType } from '@shared/core/domain/entity';

describe('OnbordingFeaturedComponent', () => {
  let component: OnbordingFeaturedComponent;
  let fixture: ComponentFixture<OnbordingFeaturedComponent>;

  let serviceTmdbStub: jasmine.SpyObj<TheMovieDBPort>;

  beforeEach(async () => {
    const serviceTmdb = {
      getFeaturedSeries: jasmine.createSpy().and.returnValue(of([])),
      getFeaturedMovies: jasmine.createSpy().and.returnValue(of([])),
    } as jasmine.SpyObj<TheMovieDBPort>;

    await TestBed.configureTestingModule({
      imports: [OnbordingFeaturedComponent],
      providers: [
        {
          provide: TheMovieDBPort,
          useValue: serviceTmdb,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(OnbordingFeaturedComponent);
    component = fixture.componentInstance;

    serviceTmdbStub = TestBed.inject(TheMovieDBPort) as jasmine.SpyObj<TheMovieDBPort>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call __init', () => {
    spyOn<any>(component, '__getFeaturedMovies').and.callThrough();
    spyOn<any>(component, '__getFeaturedSeries').and.callThrough();

    component.ngOnInit();

    expect(component['__getFeaturedMovies']).toHaveBeenCalled();
    expect(component['__getFeaturedSeries']).toHaveBeenCalled();
  });

  it('should call __getFeaturedMovies', () => {
    component['__getFeaturedMovies']({ page: 2 });
    expect(serviceTmdbStub.getFeaturedMovies).toHaveBeenCalled();
    expect(component.stateMovies()).toEqual([]);
  });

  it('should call __getFeaturedSeries', () => {
    component['__getFeaturedSeries']({ page: 2 });
    expect(serviceTmdbStub.getFeaturedSeries).toHaveBeenCalled();
    expect(component.stateSeries()).toEqual([]);
  });

  it('should call handleTabSelected', () => {
    spyOn(component.isMovies, 'set').and.callThrough();

    component.handleTabSelected('movies');

    expect(component.isMovies.set).toHaveBeenCalled();
  });

  describe('OnbordingFeaturedComponent - More Movies', () => {
    it('should call onMoreMovies', () => {
      spyOn<any>(component, '__getFeaturedMovies').and.callThrough();
      component.stateMovies.set([
        {
          id_movie: 1,
          page: 3,
          title: 'title',
          poster_path: 'poster_path',
          media_type: MediaType.Movie,
          overview: 'overview',
          vote_average: 5,
          total_pages: 10,
          total_results: 100,
        },
      ]);
      component.onMoreMovies(true);
      expect(component['__getFeaturedMovies']).toHaveBeenCalled();
    });

    it('should call onMoreMovies with false', () => {
      spyOn<any>(component, '__getFeaturedMovies').and.callThrough();
      component.onMoreMovies(false);
      expect(component['__getFeaturedMovies']).not.toHaveBeenCalled();
    });
  });

  describe('OnbordingFeaturedComponent - More Series', () => {
    it('should call onMoreSeries', () => {
      spyOn<any>(component, '__getFeaturedSeries').and.callThrough();
      component.stateSeries.set([
        {
          id_serie: 1,
          page: 3,
          title: 'title',
          poster_path: 'poster_path',
          media_type: MediaType.Tv,
          overview: 'overview',
          vote_average: 5,
          total_pages: 10,
          total_results: 100,
        },
      ]);
      component.onMoreSeries(true);
      expect(component['__getFeaturedSeries']).toHaveBeenCalled();
    });

    it('should call onMoreSeries with false', () => {
      spyOn<any>(component, '__getFeaturedSeries').and.callThrough();
      component.onMoreSeries(false);
      expect(component['__getFeaturedSeries']).not.toHaveBeenCalled();
    });
  });
});
