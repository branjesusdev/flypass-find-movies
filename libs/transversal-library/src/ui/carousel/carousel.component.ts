import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnInit, signal } from '@angular/core';
import { RippleModule } from 'primeng/ripple';
import { register, SwiperContainer } from 'swiper/element/bundle';
import { SwiperOptions } from 'swiper/types';

import { CardPosterComponent } from '../card-poster/card-poster.component';
import { ItemsCarousel } from '../../entitys/items-carousel';

@Component({
  selector: 'ui-carousel',
  standalone: true,
  imports: [CommonModule, CardPosterComponent, RippleModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselComponent implements OnInit {

  swiperElement = signal<SwiperContainer | null>(null);
  @Input({ required: true }) items: ItemsCarousel[] = [];
  @Input({ required: true }) key: string = '';

  ngOnInit(): void {

    const swiperEl = document.querySelector(`#${this.key}`) as SwiperContainer;

    const swiperOptions: SwiperOptions = {
      slidesPerView: 8,
      spaceBetween: 5,
      navigation: {
        nextEl: `.swiper-button-next-${this.key}`,
        prevEl: `.swiper-button-prev-${this.key}`,
        enabled: true
      },
      breakpoints: {

        0: {
          slidesPerView: 2,
          spaceBetween: 10,
        },

        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 50,
        },
        1440: {
          slidesPerView: 7,
          spaceBetween: 60,
        }

      },
    }

    Object.assign(swiperEl!, swiperOptions);

    this.swiperElement.set(swiperEl as SwiperContainer);
    this.swiperElement()?.initialize();
  }
}
