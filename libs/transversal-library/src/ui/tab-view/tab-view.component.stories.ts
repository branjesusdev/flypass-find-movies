import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { TabViewComponent } from './tab-view.component';
import { Component } from '@angular/core';
import { TabPanelComponent } from './tab-panel/tab-panel.component';
import { fn } from '@storybook/test';
import { CarouselComponent } from '../carousel/carousel.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [TabViewComponent, TabPanelComponent, CarouselComponent, CommonModule],
  template: `
    <ui-tab-view>
      <ui-tab-panel tabTitle="demo" keyTab="demo"> Content demo </ui-tab-panel>
    </ui-tab-view>
  `,
})
class DemoComponent {}

const meta: Meta<TabViewComponent> = {
  title: 'Components/TabView',
  component: TabViewComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [TabPanelComponent, CarouselComponent, CommonModule],
    }),
  ],
  render: ({ ...args }) => ({
    props: { ...args },
    template: `
      <ui-tab-view>
        <ui-tab-panel tabTitle="Movies" keyTab="demo">
          <p class="max-w-80 text-balance py-4 px-2"> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora eligendi quas amet laboriosam possimus at? Quibusdam, magnam quisquam eum praesentium, quod laudantium qui dicta maiores maxime debitis voluptate ipsam iusto! </p>
        </ui-tab-panel>

        <ui-tab-panel tabTitle="Series" keyTab="demo2">
          <p class="max-w-80 text-balance py-4 px-2"> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident inventore id iure ad aliquid laudantium quaerat corrupti? Deleniti, fugiat quis laboriosam quos consequuntur quaerat error necessitatibus ad voluptatum beatae ipsum! </p>
        </ui-tab-panel>
      </ui-tab-view>
    `,
  }),
};

export default meta;
type Story = StoryObj<TabViewComponent>;

export const Primary: Story = {
  args: {
    tabSelected: fn(),
  },
};
