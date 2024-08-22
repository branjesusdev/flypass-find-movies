import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnbordingPremieresComponent } from './onbording-premieres.component';
import { TheMovieDBPort } from '@shared/core/domain/ports/themoviedb-port.class';
import { of } from 'rxjs';

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
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OnbordingPremieresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    serviceTmdbStub = TestBed.inject(TheMovieDBPort) as jasmine.SpyObj<TheMovieDBPort>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
