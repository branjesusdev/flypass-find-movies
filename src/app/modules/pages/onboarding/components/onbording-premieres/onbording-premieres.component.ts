import { Component, DestroyRef, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { TheMovieDBPort } from '@shared/core/domain/ports/themoviedb-port.class';
import { Trending } from '@shared/core/domain/entity';
import { CarouselComponent, ItemsCarousel } from '@lib-transversal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onbording-premieres',
  standalone: true,
  imports: [CarouselComponent],
  templateUrl: './onbording-premieres.component.html',
  styleUrl: './onbording-premieres.component.scss',
})
export class OnbordingPremieresComponent implements OnInit {
  posters = signal<Trending[]>([]);

  constructor(
    private serviceTmdb: TheMovieDBPort,
    private destroyRef: DestroyRef,
    private router: Router,
  ) {}

  ngOnInit() {
    this.__init__();
  }

  __init__() {
    this.serviceTmdb
      .getTrending()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((movies) => {
        console.log('tranding movies', movies);
        this.posters.set(movies);
      });
  }

  onPoster(poster: ItemsCarousel): void {
    this.router.navigate(['poster-detail', poster.media_type, poster.id]);
  }
}
