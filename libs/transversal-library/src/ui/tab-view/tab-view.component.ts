import {
  AfterContentInit,
  Component,
  contentChildren,
  EventEmitter,
  Output,
  signal,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { TabPanelComponent } from './tab-panel/tab-panel.component';
import { CarouselComponent } from '../carousel/carousel.component';

@Component({
  selector: 'ui-tab-view',
  standalone: true,
  imports: [CommonModule, TabPanelComponent, CarouselComponent],
  templateUrl: './tab-view.component.html',
  styleUrl: './tab-view.component.scss',
})
export class TabViewComponent implements AfterContentInit {
  panels = contentChildren(TabPanelComponent);
  activePanel = signal<TabPanelComponent | undefined>(undefined);
  @Output() tabSelected = new EventEmitter<string>();

  ngAfterContentInit() {
    if (this.panels().length > 0) this.selectPanel(this.panels()[0]);
  }

  selectPanel(panel: TabPanelComponent) {
    this.activePanel.set(panel);
    this.panels().forEach((p) => (p.active = false));
    panel.active = true;

    this.tabSelected.emit(panel.keyTab);
  }

  onTabClick(panel: TabPanelComponent) {
    this.selectPanel(panel);
  }
}
