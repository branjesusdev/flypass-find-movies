import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPosterComponent } from './card-poster.component';

describe('CardPosterComponent', () => {
  let component: CardPosterComponent;
  let fixture: ComponentFixture<CardPosterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardPosterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardPosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
