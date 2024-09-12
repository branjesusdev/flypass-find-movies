import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedSeriesComponent } from './featured-series.component';
import { provideRouter } from '@angular/router';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ItemsCarousel } from '@lib-transversal';
import { FeaturedSerie, MediaType } from '@shared/core/domain/entity';
import { TheMovieDBPort } from '@shared/core/domain/ports/themoviedb-port.class';
import { of } from 'rxjs';
import { SeriesStore } from '@pages/onboarding/store/series.store';

@Component({
  selector: 'app-dumy-component',
  template: ``,
  standalone: true,
})
class DumyComponent {}

describe('FeaturedSeriesComponent', () => {
  let component: FeaturedSeriesComponent;
  let fixture: ComponentFixture<FeaturedSeriesComponent>;
  let serviceTmdbStub: jasmine.SpyObj<TheMovieDBPort>;

  beforeEach(async () => {
    const serviceTmdb = {
      getFeaturedSeries: jasmine.createSpy().and.returnValue(of([])),
    } as jasmine.SpyObj<TheMovieDBPort>;

    await TestBed.configureTestingModule({
      imports: [FeaturedSeriesComponent],
      providers: [
        provideRouter([
          {
            path: 'poster-detail/:media_type/:id',
            component: DumyComponent,
          },
        ]),
        {
          provide: TheMovieDBPort,
          useValue: serviceTmdb,
        },
        SeriesStore,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturedSeriesComponent);
    component = fixture.componentInstance;

    serviceTmdbStub = TestBed.inject(TheMovieDBPort) as jasmine.SpyObj<TheMovieDBPort>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call __init', () => {
    spyOn<any>(component, '__getFeaturedSeries').and.callThrough();

    component.ngOnInit();
    expect(component['__getFeaturedSeries']).toHaveBeenCalled();
  });

  it('should call __getFeaturedSeries', () => {
    component['__getFeaturedSeries']({ page: 2 });
    expect(serviceTmdbStub.getFeaturedSeries).toHaveBeenCalled();
    expect(component.posters()).toEqual([]);
  });

  describe('OnbordingFeaturedComponent - More Series', () => {
    it('should call onMoreSeries', () => {
      spyOn<any>(component, '__getFeaturedSeries').and.callThrough();
      component.onReachEnd(true);
      expect(component['__getFeaturedSeries']).toHaveBeenCalled();
    });

    it('should call onMoreSeries with false', () => {
      spyOn<any>(component, '__getFeaturedSeries').and.callThrough();
      component.onReachEnd(false);
      expect(component['__getFeaturedSeries']).not.toHaveBeenCalled();
    });
  });

  it('should call onPoster', () => {
    spyOn(component, 'onPoster').and.callThrough();

    const poster: ItemsCarousel = {
      id: 1,
      media_type: 'movie',
      overview: 'test',
      poster_path: 'http://test.com',
      title: 'test',
      vote_average: 1,
    };

    component.onPoster(poster);

    expect(component.onPoster).toHaveBeenCalled();
    expect(component['router']).toBeTruthy();
  });
});
