import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedMoviesComponent } from './featured-movies.component';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { ItemsCarousel } from '@lib-transversal';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FeaturedMovie } from '@shared/core/domain/entity';

@Component({
  selector: 'app-featured-movies',
  standalone: true,
  template: '',
})
class DummyComponent {}

describe('FeaturedMoviesComponent', () => {
  let component: FeaturedMoviesComponent;
  let fixture: ComponentFixture<FeaturedMoviesComponent>;

  beforeEach(async () => {
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
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturedMoviesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call binding featuredMovies', () => {
    const series: FeaturedMovie[] = [
      {
        id_movie: 1,
        title: 'Title',
        poster_path: 'path',
        vote_average: 5,
        overview: 'overview',
        media_type: 'movie',
        page: 1,
      },
    ];

    component.featuredMovies = series;
    expect(component.posters.set).toBeTruthy();
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

  it('should call onReachEnd', () => {
    component.onReachEnd(true);
    expect(component.moreMovies.emit).toBeTruthy();
  });

  it('should call onReachEnd with false', () => {
    spyOn(component.moreMovies, 'emit');
    component.onReachEnd(false);
    expect(component.moreMovies.emit).not.toHaveBeenCalled();
  });
});
