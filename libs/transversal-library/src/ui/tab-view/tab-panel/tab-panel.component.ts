import { CommonModule, NgIf } from '@angular/common';
import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'ui-tab-panel',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (active) {
      <ng-content></ng-content>
    }
  `,
})
export class TabPanelComponent {
  @Input() tabTitle!: string;
  @Input() keyTab: string = 'keyTab';
  @Input() active = false;
}
