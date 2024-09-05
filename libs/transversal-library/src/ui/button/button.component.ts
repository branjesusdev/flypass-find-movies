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
  @Input() type: 'primary' | 'secondary' = 'primary';
  @Input({ required: true }) text: string = '';
  @Input() isDefaultIcon = false;
  @Input() valueEvent: any;
  @Output() handleClick = new EventEmitter<any>();

  handleClickEvent() {
    this.handleClick.emit(this.valueEvent);
  }

  get sizeBtn(): string {
    const sizeButton = (size: string) => {
      switch (size) {
        case 'small':
          return 'btn-sm';
        case 'medium':
          return '';
        case 'large':
          return 'btn-lg';
        default:
          return '';
      }
    };

    return sizeButton(this.size);
  }

  get typeBtn(): { styleText: string; styleButton: string } {
    const typeButton = (type: string) => {
      switch (type) {
        case 'secondary':
          return {
            styleText: 'text-gray-300 group-hover:text-white text-sm text-left',
            styleButton:
              'group flex items-center border border-neutral-600/50 bg-neutral-800 hover:bg-neutral-900 p-2 rounded-md cursor-pointer transition-colors duration-300',
          };
        default:
          return {
            styleText: 'text-black',
            styleButton:
              'btn bg-primary-ui hover:bg-primary-ui outline-none shadow-none border-none',
          };
      }
    };

    return typeButton(this.type);
  }
}
