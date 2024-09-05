import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';

// RESOURCES

import { MediaType, SearchMulti } from '@shared/core/domain/entity';
import { TheMovieDBPort } from '@shared/core/domain/ports/themoviedb-port.class';
import { Router, RouterLink } from '@angular/router';
import { ButtonComponent, InputComponent } from '@lib-transversal';
import { FormFocusDirective } from '@shared/directives/form-focus.directive';

@Component({
  selector: 'app-main-header',
  standalone: true,
  imports: [
    NgOptimizedImage,
    CommonModule,
    RouterLink,
    FormsModule,
    InputComponent,
    ButtonComponent,
    FormFocusDirective,
  ],
  templateUrl: './main-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainHeaderComponent implements OnInit {
  inputText = signal('');
  listResults = signal<SearchMulti[]>([]);
  listDefaultFilters = signal<string[]>([]);
  notFound = signal(false);
  isDefaultFilters = signal(false);
  isLoading = signal(false);

  private searchSubject = new Subject<string>();
  private destroyRef = inject(DestroyRef);
  private serviceTmdb = inject(TheMovieDBPort);
  private router = inject(Router);

  ngOnInit() {
    this.defaultFilters();
    this.searchSubject
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => this.listResults.set([])),
        tap(() => this.notFound.set(false)),
        tap((value) => this.inputText.set(value)),
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((searchValue) => this.searchResults({ searchValue }));
  }

  onSearch(event: string): void {
    this.searchSubject.next(event);
  }

  onPoster(poster: SearchMulti): void {
    this.listResults.set([]);
    this.inputText.set('');
    this.isDefaultFilters.set(false);
    this.router.navigate(['poster-detail', poster.media_type, poster.id]);
  }

  onEnter(): void {
    this.searchResults({ searchValue: this.inputText() });
  }

  private searchResults({ searchValue }: { searchValue: string }): void {
    if (!searchValue) {
      this.listResults.set([]);
      this.isDefaultFilters.set(true);
      this.notFound.set(false);
      return;
    }

    this.isLoading.set(true);

    this.serviceTmdb
      .searchByFilter(searchValue)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((movies) => {
        movies = movies.filter(
          (movie) => movie.media_type == MediaType.Movie || movie.media_type == MediaType.Tv,
        );

        this.isDefaultFilters.set(false);
        this.notFound.set(movies.length === 0);
        this.listResults.set(movies.slice(0, 5));
        this.isLoading.set(false);
      });
  }

  defaultFilters(): void {
    const filters = [
      'Cars',
      'Aventura',
      'Comedia',
      'Avengers',
      'Harry Potter',
      'House of the Dragon',
      'The Boys',
      'The Lord of the Rings',
      'Jurassic Park',
    ];

    this.listDefaultFilters.set(filters);
  }
}
