import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnbordingPremieresComponent } from './onbording-premieres.component';
import { TheMovieDBPort } from '@shared/core/domain/ports/themoviedb-port.class';
import { of } from 'rxjs';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ItemsCarousel } from '@lib-transversal';
import { provideRouter } from '@angular/router';

@Component({
  selector: 'app-dumy-component',
  template: ``,
  standalone: true,
})
export class DumyComponent {}

describe('OnbordingPremieresComponent', () => {
  let component: OnbordingPremieresComponent;
  let fixture: ComponentFixture<OnbordingPremieresComponent>;

  let serviceTmdbStub: jasmine.SpyObj<TheMovieDBPort>;

  beforeEach(async () => {
    const serviceTmdb = {
      getTrending: jasmine.createSpy().and.returnValue(of([])),
    };

    await TestBed.configureTestingModule({
      imports: [OnbordingPremieresComponent],
      providers: [
        {
          provide: TheMovieDBPort,
          useValue: serviceTmdb,
        },
        provideRouter([
          {
            path: 'poster-detail/:media_type/:id',
            component: DumyComponent,
          },
        ]),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(OnbordingPremieresComponent);
    component = fixture.componentInstance;

    serviceTmdbStub = TestBed.inject(TheMovieDBPort) as jasmine.SpyObj<TheMovieDBPort>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call __init', () => {
    spyOn<any>(component, '__getTrending').and.callThrough();

    component.ngOnInit();

    expect(component['__getTrending']).toHaveBeenCalled();
  });

  it('should call onPoster', () => {
    spyOn(component['router'], 'navigate').and.callThrough();

    const poster: ItemsCarousel = {
      id: 1,
      title: 'Title',
      poster_path: 'path',
      vote_average: 5,
      overview: 'overview',
      media_type: 'movie',
    };

    component.onPoster(poster);
    expect(component['router'].navigate).toHaveBeenCalled();
  });

  it('should call onMorePremieres', () => {
    spyOn<any>(component, '__getTrending').and.callThrough();

    component.posters.set([
      {
        page: 1,
        id: 1,
        media_type: 'movie',
        title: 'Title',
        poster_path: 'https://path',
        vote_average: 5,
        overview: 'overview',
      },
    ]);

    component.onMorePremieres(true);

    expect(component['__getTrending']).toHaveBeenCalled();
  });

  it('should call onMorePremieres with false', () => {
    spyOn<any>(component, '__getTrending').and.callThrough();
    component.onMorePremieres(false);

    expect(component['__getTrending']).not.toHaveBeenCalled();
  });
});
