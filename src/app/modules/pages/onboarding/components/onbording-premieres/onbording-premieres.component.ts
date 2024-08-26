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
    this.__getTrending();
  }

  private __getTrending({ page }: { page: number } = { page: 1 }): void {
    this.serviceTmdb
      .getTrending({ page })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((movies) => {
        this.posters.set(movies);
      });
  }

  onPoster(poster: ItemsCarousel): void {
    this.router.navigate(['poster-detail', poster.media_type, poster.id]);
  }

  onMorePremieres(morePremieres: boolean): void {
    console.log('onMorePremieres', morePremieres);

    if (!morePremieres) return;

    const lastPage = this.posters().reduce((max, premier) =>
      max.page > premier.page ? max : premier,
    );
    this.__getTrending({ page: lastPage.page + 1 });
  }
}
