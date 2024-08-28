import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselComponent } from './carousel.component';
import { CardPosterComponent } from '../card-poster/card-poster.component';
import { CUSTOM_ELEMENTS_SCHEMA, ElementRef } from '@angular/core';
import { ItemsCarousel } from '../../entitys/items-carousel';
import { SwiperContainer } from 'swiper/element';

describe('CarouselComponent', () => {
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;
  let swiperContainerSpy: jasmine.SpyObj<ElementRef<SwiperContainer>>;

  beforeEach(async () => {
    const swiperContainer = jasmine.createSpyObj('SwiperContainer', ['nativeElement']);
    swiperContainer.nativeElement = { swiper: jasmine.createSpyObj('swiper', ['slideTo']) };

    await TestBed.configureTestingModule({
      imports: [CarouselComponent, CardPosterComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;
    swiperContainerSpy = TestBed.inject(ElementRef) as jasmine.SpyObj<ElementRef<SwiperContainer>>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit ngOnChanges', () => {
    const newItems: ItemsCarousel[] = [
      {
        id: 1,
        title: 'title',
        poster_path: 'poster_path',
        media_type: 'media_type',
        vote_average: 1,
        overview: 'overview',
      },
    ];
    component.items = newItems;
    component.ngOnChanges({
      items: { currentValue: newItems, previousValue: [], firstChange: false },
    });

    const swiper = swiperContainerSpy.nativeElement.swiper;
    expect(swiper.slideTo).toHaveBeenCalledWith(component['currentActive'](), 0, false);
  });
});
