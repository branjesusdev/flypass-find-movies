import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnbordingMasterComponent } from './onbording-master.component';

describe('OnbordingMasterComponent', () => {
  let component: OnbordingMasterComponent;
  let fixture: ComponentFixture<OnbordingMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OnbordingMasterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnbordingMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
