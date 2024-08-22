import { ComponentFixture, TestBed } from '@angular/core/testing';

import PosterDetailMasterComponent from './poster-detail-master.component';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { Component } from '@angular/core';
import { DetailPoster } from '@shared/core/domain/entity';

@Component({
  selector: 'app-dumy-component',
  template: ``,
  standalone: true,
})
class DumyComponent {}
describe('PosterDetailMasterComponent', () => {
  let component: PosterDetailMasterComponent;
  let fixture: ComponentFixture<PosterDetailMasterComponent>;

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
    };

    await TestBed.configureTestingModule({
      imports: [PosterDetailMasterComponent],
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

    fixture = TestBed.createComponent(PosterDetailMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
