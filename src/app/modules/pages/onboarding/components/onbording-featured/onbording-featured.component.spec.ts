import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnbordingFeaturedComponent } from './onbording-featured.component';
import { TheMovieDBPort } from '@shared/core/domain/ports/themoviedb-port.class';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

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

  it('should call handleTabSelected', () => {
    spyOn(component.isMovies, 'set').and.callThrough();

    component.handleTabSelected('movies');

    expect(component.isMovies.set).toHaveBeenCalled();
  });

  // describe('OnbordingFeaturedComponent - More Movies', () => {
  //   it('should call onMoreMovies', () => {
  //     spyOn<any>(component, '__getFeaturedMovies').and.callThrough();
  //     component.stateMovies.set([
  //       {
  //         id_movie: 1,
  //         page: 3,
  //         title: 'title',
  //         poster_path: 'poster_path',
  //         media_type: MediaType.Movie,
  //         overview: 'overview',
  //         vote_average: 5,
  //         total_pages: 10,
  //         total_results: 100,
  //       },
  //     ]);
  //     component.onMoreMovies(true);
  //     expect(component['__getFeaturedMovies']).toHaveBeenCalled();
  //   });

  //   it('should call onMoreMovies with false', () => {
  //     spyOn<any>(component, '__getFeaturedMovies').and.callThrough();
  //     component.onMoreMovies(false);
  //     expect(component['__getFeaturedMovies']).not.toHaveBeenCalled();
  //   });
  // });
});
