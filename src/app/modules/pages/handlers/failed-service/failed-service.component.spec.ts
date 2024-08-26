import { ComponentFixture, TestBed } from '@angular/core/testing';

import FailedServiceComponent from './failed-service.component';
import { provideRouter } from '@angular/router';
import { Component } from '@angular/core';
import { ButtonComponent } from '@lib-transversal';
import { provideLocationMocks } from '@angular/common/testing';

@Component({
  selector: 'app-dummy',
  standalone: true,
  template: '',
})
class DummyComponent {}

describe('FailedServiceComponent', () => {
  let component: FailedServiceComponent;
  let fixture: ComponentFixture<FailedServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FailedServiceComponent, DummyComponent, ButtonComponent],
      providers: [
        provideRouter([
          {
            path: '',
            component: DummyComponent,
          },
        ]),
        provideLocationMocks(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FailedServiceComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call refreshPage', () => {
    component.refreshPage();
    expect(component['router'].navigate).toBeTruthy();
  });
});
