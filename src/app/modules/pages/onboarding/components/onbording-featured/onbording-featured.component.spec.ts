import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnbordingFeaturedComponent } from './onbording-featured.component';
import { TheMovieDBPort } from '@shared/core/domain/ports/themoviedb-port.class';
import { of } from 'rxjs';

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
    }).compileComponents();

    fixture = TestBed.createComponent(OnbordingFeaturedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    serviceTmdbStub = TestBed.inject(TheMovieDBPort) as jasmine.SpyObj<TheMovieDBPort>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
