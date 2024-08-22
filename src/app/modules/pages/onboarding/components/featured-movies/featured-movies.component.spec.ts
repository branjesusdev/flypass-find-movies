import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedMoviesComponent } from './featured-movies.component';

describe('FeaturedMoviesComponent', () => {
  let component: FeaturedMoviesComponent;
  let fixture: ComponentFixture<FeaturedMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedMoviesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturedMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
