import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';


import { MenuItemTab } from '../../entitys/menu-item-tab';

@Component({
  selector: 'ui-tabview',
  standalone: true,
  imports: [
    TabViewModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  templateUrl: './tabview.component.html',
  styleUrl: './tabview.component.scss'
})
export class TabviewComponent{
  @Input() items: MenuItemTab[] | undefined;


}
