import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appFormFocus]',
  standalone: true,
})
export class FormFocusDirective implements OnInit {
  private originalWidth: string;
  @Input('appFormFocus') toggleElement!: `.${string}`;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {
    this.originalWidth = this.el.nativeElement.style.width;
  }

  ngOnInit(): void {
    const elementToggled = this.el.nativeElement.querySelectorAll(this.toggleElement);
    if (elementToggled) {
      elementToggled?.forEach((element: HTMLElement) => {
        element.classList.add('hidden');
      });
    }
  }

  @HostListener('focusin', ['$event'])
  onFocusIn(event: FocusEvent): void {
    // console.log('focusin');

    const { tagName } = event.target as HTMLInputElement;

    if (tagName === 'INPUT') {
      this.renderer.setStyle(this.el.nativeElement, 'width', '100%');
      const elementsToggled = this.el.nativeElement.querySelectorAll(this.toggleElement);
      if (elementsToggled) {
        elementsToggled?.forEach((element: HTMLElement) => {
          element.classList.remove('hidden');
        });
      }
    }
  }

  @HostListener('focusout', ['$event'])
  onFocusOut(event: FocusEvent): void {
    const { tagName } = event.target as HTMLInputElement;

    if (tagName === 'INPUT') {
      const relatedTarget = event.relatedTarget as HTMLElement;
      if (relatedTarget && this.el.nativeElement.contains(relatedTarget)) {
        return;
      }

      const elementsToggled = this.el.nativeElement.querySelectorAll(this.toggleElement);
      if (elementsToggled) {
        setTimeout(() => {
          this.renderer.setStyle(this.el.nativeElement, 'width', this.originalWidth);
          elementsToggled?.forEach((element: HTMLElement) => {
            element.classList.add('hidden');
          });
        }, 200);
      }
    }
  }
}
