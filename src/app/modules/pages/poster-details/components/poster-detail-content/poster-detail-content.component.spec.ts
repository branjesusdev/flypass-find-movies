import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosterDetailContentComponent } from './poster-detail-content.component';
import { ActivatedRoute, provideRouter, withComponentInputBinding } from '@angular/router';
import { DetailPoster } from '@shared/core/domain/entity';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dumy-component',
  template: ``,
  standalone: true,
})
class DumyComponent {}

describe('PosterDetailContentComponent', () => {
  let component: PosterDetailContentComponent;
  let fixture: ComponentFixture<PosterDetailContentComponent>;

  beforeEach(async () => {
    const mockPosterContent: DetailPoster = {
      id: 1,
      name: 'Movie',
      overview: 'Overview',
      poster_path: 'path',
      release_date: new Date(),
      vote_average: 10,
      media_type: 'movie',
      genres: ['Action', 'Adventure'],
      popularity: 10,
      spoken_languages: ['English'],
      production_companies: ['Company'],
      production_countries: ['Country'],
      number_of_seasons: 1,
      tagline: 'Tagline',
      first_air_date: new Date(),
      runtime: 1,
    };

    await TestBed.configureTestingModule({
      imports: [PosterDetailContentComponent],
      providers: [
        provideRouter(
          [
            {
              path: 'poster-detail/:mediaType/:id',
              component: DumyComponent,
              resolve: mockPosterContent,
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PosterDetailContentComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
