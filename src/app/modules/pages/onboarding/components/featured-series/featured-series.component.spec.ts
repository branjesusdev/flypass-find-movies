import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedSeriesComponent } from './featured-series.component';
import { provideRouter } from '@angular/router';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ItemsCarousel } from '@lib-transversal';
import { FeaturedSerie } from '@shared/core/domain/entity';

@Component({
  selector: 'app-dumy-component',
  template: ``,
  standalone: true,
})
class DumyComponent {}

describe('FeaturedSeriesComponent', () => {
  let component: FeaturedSeriesComponent;
  let fixture: ComponentFixture<FeaturedSeriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedSeriesComponent],
      providers: [
        provideRouter([
          {
            path: 'poster-detail/:media_type/:id',
            component: DumyComponent,
          },
        ]),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturedSeriesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call binding featuredSeries', () => {
    const series: FeaturedSerie[] = [
      {
        id_serie: 1,
        title: 'Title',
        poster_path: 'path',
        vote_average: 5,
        overview: 'overview',
        media_type: 'Serie',
        page: 1,
      },
    ];

    component.featuredSeries = series;
    expect(component.posters.set).toBeTruthy();
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

  it('should call onReachEnd', () => {
    component.onReachEnd(true);

    expect(component.moreSeries.emit).toBeTruthy();
  });

  it('should call onReachEnd with false', () => {
    spyOn(component.moreSeries, 'emit');

    component.onReachEnd(false);

    expect(component.moreSeries.emit).not.toHaveBeenCalled();
  });
});
