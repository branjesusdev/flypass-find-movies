import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedSeriesComponent } from './featured-series.component';
import { provideRouter } from '@angular/router';
import { Component } from '@angular/core';
import { ItemsCarousel } from '@lib-transversal';

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
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturedSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
