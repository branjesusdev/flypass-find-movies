import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedMoviesComponent } from './featured-movies.component';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { ItemsCarousel } from '@lib-transversal';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SeriesStore } from '@pages/onboarding/store/series.store';
import { TheMovieDBPort } from '@shared/core/domain/ports/themoviedb-port.class';
import { of } from 'rxjs';

@Component({
  selector: 'app-featured-movies',
  standalone: true,
  template: '',
})
class DummyComponent {}

describe('FeaturedMoviesComponent', () => {
  let component: FeaturedMoviesComponent;
  let fixture: ComponentFixture<FeaturedMoviesComponent>;

  let serviceTmdbStub: jasmine.SpyObj<TheMovieDBPort>;

  beforeEach(async () => {
    const serviceTmdb = {
      getFeaturedMovies: jasmine.createSpy().and.returnValue(of([])),
    } as jasmine.SpyObj<TheMovieDBPort>;

    await TestBed.configureTestingModule({
      imports: [FeaturedMoviesComponent],
      providers: [
        provideRouter(
          [
            {
              path: 'poster-detail/:media_type/:id',
              component: DummyComponent,
            },
          ],
          withComponentInputBinding(),
        ),
        {
          provide: TheMovieDBPort,
          useValue: serviceTmdb,
        },
        SeriesStore,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturedMoviesComponent);
    component = fixture.componentInstance;

    serviceTmdbStub = TestBed.inject(TheMovieDBPort) as jasmine.SpyObj<TheMovieDBPort>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call __init', () => {
    spyOn<any>(component, '__getFeaturedMovies').and.callThrough();

    component.ngOnInit();
    expect(component['__getFeaturedMovies']).toHaveBeenCalled();
  });

  it('should call __getFeaturedMovies', () => {
    component['__getFeaturedMovies']({ page: 2 });
    expect(serviceTmdbStub.getFeaturedMovies).toHaveBeenCalled();
    expect(component.posters()).toEqual([]);
  });

  describe('OnbordingFeaturedComponent - More Series', () => {
    it('should call onMoreMovies', () => {
      spyOn<any>(component, '__getFeaturedMovies').and.callThrough();
      component.onReachEnd(true);
      expect(component['__getFeaturedMovies']).toHaveBeenCalled();
    });

    it('should call onMoreMovies with false', () => {
      spyOn<any>(component, '__getFeaturedMovies').and.callThrough();
      component.onReachEnd(false);
      expect(component['__getFeaturedMovies']).not.toHaveBeenCalled();
    });
  });

  it('should call onPoster', () => {
    const poster: ItemsCarousel = {
      id: 1,
      title: 'Title',
      poster_path: 'path',
      vote_average: 5,
      overview: 'overview',
      media_type: 'movie',
    };

    component.onPoster(poster);
    expect(component['router'].navigate).toBeTruthy();
  });
});
