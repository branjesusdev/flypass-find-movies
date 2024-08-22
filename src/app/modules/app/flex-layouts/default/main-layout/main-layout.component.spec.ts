import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLayoutComponent } from './main-layout.component';
import { TheMovieDBPort } from '@shared/core/domain/ports/themoviedb-port.class';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';

describe('MainLayoutComponent', () => {
  let component: MainLayoutComponent;
  let fixture: ComponentFixture<MainLayoutComponent>;

  beforeEach(async () => {
    const serviceTmdb = jasmine.createSpyObj('TheMovieDBPort', ['searchMulti']);

    await TestBed.configureTestingModule({
      imports: [MainLayoutComponent, RouterModule],
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

    fixture = TestBed.createComponent(MainLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
