import { CommonModule } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
  ElementRef,
  EventEmitter,
  inject,
  Injector,
  Input,
  OnChanges,
  Output,
  signal,
  viewChild,
} from '@angular/core';
import { register, SwiperContainer } from 'swiper/element/bundle';
import { Swiper, SwiperOptions } from 'swiper/types';

import { CardPosterComponent } from '../card-poster/card-poster.component';
import { ItemsCarousel } from '../../entitys/items-carousel';

register();
interface SwiperNativeEl {
  swiper: Swiper;
  initialize: () => void;
}

@Component({
  selector: 'ui-carousel',
  standalone: true,
  imports: [CommonModule, CardPosterComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselComponent implements OnChanges {
  swiperElement = signal<SwiperContainer | null>(null);
  @Input({ required: true }) items: ItemsCarousel[] = [];
  @Input({ required: true }) key: string = '';

  @Output() outPoster = new EventEmitter<ItemsCarousel>();
  @Output() outReachEnd = new EventEmitter<boolean>();

  isVisibleNavigation = false;
  isReachEnd = signal<boolean>(false);

  private readonly currentActive = signal<number>(0);
  private readonly swiperContainer = viewChild<ElementRef<SwiperNativeEl>>('swiperContainer');
  private readonly injector = inject(Injector);

  constructor() {
    afterNextRender(() => {
      effect(
        () => {
          if (this.swiperContainer()) {
            const swiperEl = this.swiperContainer()?.nativeElement;

            if (!swiperEl) return;

            const swiperOptions: SwiperOptions = {
              slidesPerView: 8,
              spaceBetween: 5,
              navigation: {
                nextEl: `.swiper-button-next-${this.key}`,
                prevEl: `.swiper-button-prev-${this.key}`,
                enabled: true,
              },
              breakpoints: {
                0: { slidesPerView: 2, spaceBetween: 10 },
                640: { slidesPerView: 2, spaceBetween: 20 },
                700: { slidesPerView: 3, spaceBetween: 30 },
                800: { slidesPerView: 3, spaceBetween: 40 },
                1170: { slidesPerView: 5, spaceBetween: 50 },
                1440: { slidesPerView: 6, spaceBetween: 60 },
                1600: { slidesPerView: 7, spaceBetween: 70 },
              },
              eventsPrefix: 'swiper-',
              on: {
                slideChangeTransitionEnd: () => {
                  if (swiperEl.swiper.isEnd) {
                    this.currentActive.set(swiperEl.swiper.activeIndex);
                    this.isReachEnd.set(true);
                    this.outReachEnd.emit(true);
                  }
                },
              },
            };

            Object.assign(swiperEl, swiperOptions);
            swiperEl.initialize();
          }
        },
        { injector: this.injector, allowSignalWrites: true },
      );
    });
  }

  ngOnChanges(changes: any): void {
    if (changes.items && !changes.items.firstChange) {
      setTimeout(() => {
        console.log('this.currentActive()', this.currentActive());

        this.swiperContainer()?.nativeElement.swiper.slideTo(this.currentActive(), 0, false);
      }, 300);
    }
  }

  selectPoster(poster: ItemsCarousel): void {
    this.outPoster.emit(poster);
  }
}
