import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormFocusDirective } from './form-focus.directive';
import { Component, ElementRef, Renderer2 } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <form appFormFocus=".toggle-element">
      <input type="text" />
      <div class="toggle-element">
        Toggle Element
        <span id="clicEvent">Clic</span>
      </div>
    </form>
  `,
})
class TestHostComponent {}

describe('FormFocusDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let inputEl: HTMLInputElement;
  let toggleElement: HTMLElement;
  let elementClicked: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestHostComponent],
      imports: [FormFocusDirective],
      providers: [Renderer2],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();

    inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
    toggleElement = fixture.debugElement.query(By.css('.toggle-element')).nativeElement;
    elementClicked = fixture.debugElement.query(By.css('#clicEvent')).nativeElement;
  });

  it('should create an instance', () => {
    const directive = new FormFocusDirective(new ElementRef(inputEl), TestBed.inject(Renderer2));
    expect(directive).toBeTruthy();
  });

  it('should focus on input element', () => {
    inputEl.focus();
    expect(document.activeElement).toBe(inputEl);
  });

  it('should hode the toggle element on init', () => {
    expect(toggleElement.classList).toContain('hidden');
  });

  it('should show the toggle element on focus in', async () => {
    expect(toggleElement.classList).toContain('hidden');

    inputEl.focus();

    await fixture.whenStable();
    fixture.detectChanges();

    console.log(toggleElement.classList);

    expect(toggleElement.classList).not.toContain('hidden');
  });

  it('should hide the toggle element on focus out', (done) => {
    inputEl.focus();
    fixture.detectChanges();
    expect(toggleElement.classList).not.toContain('hidden');

    inputEl.blur();
    fixture.detectChanges();

    setTimeout(() => {
      expect(toggleElement.classList).toContain('hidden');
      done();
    }, 200);
  });

  it('should hide the toggle element if relatedTarget is outside the element', (done) => {
    inputEl.focus();
    fixture.detectChanges();
    expect(toggleElement.classList).not.toContain('hidden');

    elementClicked.click();

    const focusOutEvent = new FocusEvent('focusout', {
      relatedTarget: document.createElement('div'),
    });
    inputEl.dispatchEvent(focusOutEvent);
    fixture.detectChanges();

    setTimeout(() => {
      expect(toggleElement.classList).not.toContain('hidden');
      done();
    }, 200);
  });
});
