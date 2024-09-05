import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { MainHeaderComponent } from './main-header.component';
import { TheMovieDBPort } from '@shared/core/domain/ports/themoviedb-port.class';
import { ActivatedRoute, provideRouter, RouterModule, RouterOutlet } from '@angular/router';
import { MediaType, SearchMulti } from '@shared/core/domain/entity';
import { of } from 'rxjs';
import { HttpTmdbAdapterService } from '@shared/command/adapters/http-tmdb-adapter.service';

describe('MainHeaderComponent', () => {
  let component: MainHeaderComponent;
  let fixture: ComponentFixture<MainHeaderComponent>;
  let serviceTmdbStub: jasmine.SpyObj<TheMovieDBPort>;

  beforeEach(async () => {
    const serviceTmdb = jasmine.createSpyObj<HttpTmdbAdapterService>('TheMovieDBPort', [
      'searchByFilter',
    ]);

    await TestBed.configureTestingModule({
      imports: [MainHeaderComponent, RouterModule],
      providers: [
        provideRouter([]),
        {
          provide: TheMovieDBPort,
          useValue: serviceTmdb,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MainHeaderComponent);
    component = fixture.componentInstance;
    serviceTmdbStub = TestBed.inject(TheMovieDBPort) as jasmine.SpyObj<TheMovieDBPort>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit', fakeAsync(() => {
    spyOn<any>(component, 'searchResults').and.callThrough();
    serviceTmdbStub.searchByFilter.and.returnValue(of([]));

    component.ngOnInit();
    component['searchSubject'].next('test');

    tick(500);

    expect(component.listResults()).toEqual([]);
    expect(component.listDefaultFilters().length).toBeGreaterThan(2);
    expect(component['searchResults']).toHaveBeenCalled();
  }));

  it('should call onSearch', () => {
    spyOn(component, 'onSearch').and.callThrough();

    component.inputText.set('test');
    component.onSearch('test');

    expect(component.onSearch).toHaveBeenCalled();
    expect(component.inputText()).toBe('test');
    expect(component['searchSubject']).toBeTruthy();
  });

  it('should call onPoster', () => {
    spyOn(component, 'onPoster').and.callThrough();

    const poster: SearchMulti = {
      id: 1,
      media_type: 'movie',
      title: 'test',
      poster_path: 'test',
      release_date: '2021-01-01',
      overview: 'test',
    };

    component.onPoster(poster);

    expect(component.onPoster).toHaveBeenCalled();
    expect(component.inputText()).toBe('');
    expect(component['router']).toBeTruthy();
  });

  describe('searchResults', () => {
    it('should call searchResults with empty searchValue', () => {
      spyOn<any>(component, 'searchResults').and.callThrough();

      component['searchResults']({ searchValue: '' });

      expect(component['searchResults']).toHaveBeenCalled();
      expect(component['listResults']).toBeTruthy();
      expect(component['notFound']).toBeTruthy();
    });

    it('should call onEnter', () => {
      spyOn(component, 'onEnter').and.callThrough();
      spyOn<any>(component, 'searchResults').and.callThrough();
      serviceTmdbStub.searchByFilter.and.returnValue(
        of([
          {
            id: 1,
            title: 'test',
            poster_path: 'test',
            media_type: MediaType.Movie,
            release_date: '2021-01-01',
            overview: 'test',
          },
          {
            id: 2,
            title: 'test',
            poster_path: 'test',
            media_type: MediaType.Tv,
            release_date: '2021-01-01',
            overview: 'test',
          },
        ] as SearchMulti[]),
      );

      component.inputText.set('test');
      component.onEnter();

      expect(component.onEnter).toHaveBeenCalled();
      expect(component.inputText()).toBe('test');
      expect(component['searchResults']).toBeTruthy();
    });
  });

  it('should call defaultFilters', () => {
    component.defaultFilters();
    expect(component['defaultFilters']).toBeTruthy();
    expect(component.listDefaultFilters().length).toBeGreaterThan(2);
  });
});
