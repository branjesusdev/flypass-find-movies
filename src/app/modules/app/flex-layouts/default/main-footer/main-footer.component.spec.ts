import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainFooterComponent } from './main-footer.component';
import { TheMovieDBPort } from '@shared/core/domain/ports/themoviedb-port.class';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';

describe('MainFooterComponent', () => {
  let component: MainFooterComponent;
  let fixture: ComponentFixture<MainFooterComponent>;

  beforeEach(async () => {
    const serviceTmdb = jasmine.createSpyObj('TheMovieDBPort', ['searchMulti']);

    await TestBed.configureTestingModule({
      imports: [MainFooterComponent, RouterModule],
      providers: [
        {
          provide: TheMovieDBPort,
          useValue: serviceTmdb,
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                title: 'Test',
              },
            },
          },
        },
        {
          provide: RouterOutlet,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MainFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
