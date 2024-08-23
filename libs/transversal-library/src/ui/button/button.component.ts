import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ui-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() primary = false;
  @Input({ required: true }) text: string = '';
  @Output() handleClick = new EventEmitter<void>();

  handleClickEvent() {
    this.handleClick.emit();
  }

  public get sizeBtn(): string {
    const sizeButton = (size: string) => {
      switch (size) {
        case 'small':
          return 'btn-sm';
        case 'large':
          return 'btn-lg';
        default:
          return 'btn';
      }
    };

    return sizeButton(this.size);
  }
}
