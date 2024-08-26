import type { Meta, StoryObj } from '@storybook/angular';
import { TabViewComponent } from './tab-view.component';
import { Component } from '@angular/core';
import { TabPanelComponent } from './tab-panel/tab-panel.component';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [TabViewComponent, TabPanelComponent],
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
};

export default meta;
type Story = StoryObj<TabViewComponent>;

export const Primary: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ui-tab-view>
        <ui-tab-panel tabTitle="demo" keyTab="demo">
          Content demo
        </ui-tab-panel>

        <ui-tab-panel tabTitle="demo 2" keyTab="demo1">
          Content demo 2
        </ui-tab-panel>

        <ui-tab-panel tabTitle="demo 3" keyTab="demo2">
          Content demo 3
        </ui-tab-panel>

      </ui-tab-view>
    `,
  }),
};
