import { ComponentFixture, TestBed } from '@angular/core/testing';

import OnbordingMasterComponent from './onbording-master.component';
import { TheMovieDBPort } from '@shared/core/domain/ports/themoviedb-port.class';
import { of } from 'rxjs';

describe('OnbordingMasterComponent', () => {
  let component: OnbordingMasterComponent;
  let fixture: ComponentFixture<OnbordingMasterComponent>;

  let serviceTmdbStub: jasmine.SpyObj<TheMovieDBPort>;

  beforeEach(async () => {
    const serviceTmdb = {
      getFeaturedMovies: jasmine.createSpy().and.returnValue(of([])),
      getFeaturedSeries: jasmine.createSpy().and.returnValue(of([])),
      getTrending: jasmine.createSpy().and.returnValue(of([])),
    } as jasmine.SpyObj<TheMovieDBPort>;

    await TestBed.configureTestingModule({
      imports: [OnbordingMasterComponent],
      providers: [
        {
          provide: TheMovieDBPort,
          useValue: serviceTmdb,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OnbordingMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    serviceTmdbStub = TestBed.inject(TheMovieDBPort) as jasmine.SpyObj<TheMovieDBPort>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
