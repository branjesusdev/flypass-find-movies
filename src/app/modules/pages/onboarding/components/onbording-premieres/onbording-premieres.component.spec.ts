import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnbordingPremieresComponent } from './onbording-premieres.component';

describe('OnbordingPremieresComponent', () => {
  let component: OnbordingPremieresComponent;
  let fixture: ComponentFixture<OnbordingPremieresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OnbordingPremieresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnbordingPremieresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
