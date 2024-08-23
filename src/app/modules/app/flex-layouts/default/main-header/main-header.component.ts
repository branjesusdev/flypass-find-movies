import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { debounceTime, Subject, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';

// RESOURCES

import { SearchMulti } from '@shared/core/domain/entity';
import { TheMovieDBPort } from '@shared/core/domain/ports/themoviedb-port.class';
import { Router, RouterLink } from '@angular/router';
import { InputComponent } from '@lib-transversal';

@Component({
  selector: 'app-main-header',
  standalone: true,
  imports: [NgOptimizedImage, CommonModule, RouterLink, FormsModule, InputComponent],
  templateUrl: './main-header.component.html',
})
export class MainHeaderComponent implements OnInit {
  inputText = '';
  listResults = signal<SearchMulti[]>([]);
  notFound = signal(false);

  private searchSubject = new Subject<string>();
  private destroyRef = inject(DestroyRef);
  private serviceTmdb = inject(TheMovieDBPort);
  private router = inject(Router);

  ngOnInit() {
    this.searchSubject
      .pipe(
        debounceTime(500),
        tap(() => this.listResults.set([])),
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((searchValue) => this.searchResults({ searchValue }));
  }

  onSearch(event: string): void {
    this.inputText = event;
    this.searchSubject.next(event);
  }

  onPoster(poster: SearchMulti): void {
    this.listResults.set([]);
    this.inputText = '';
    this.router.navigate(['poster-detail', poster.media_type, poster.id]);
  }

  onEnter(): void {
    this.searchResults({ searchValue: this.inputText });
  }

  private searchResults({ searchValue }: { searchValue: string }): void {
    if (!searchValue) {
      this.listResults.set([]);
      this.notFound.set(false);
      return;
    }

    this.serviceTmdb
      .searchMovies(searchValue)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((movies) => {
        console.log('movies', movies);

        this.listResults.set(movies.slice(0, 5));
        this.notFound.set(movies.length === 0);
      });
  }
}
