import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnbordingFeaturedComponent } from './onbording-featured.component';


describe('OnbordingFeaturedComponent', () => {
  let component: OnbordingFeaturedComponent;
  let fixture: ComponentFixture<OnbordingFeaturedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OnbordingFeaturedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnbordingFeaturedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
