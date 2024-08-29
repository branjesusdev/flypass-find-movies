import { Meta, type StoryObj } from '@storybook/angular';
import { BadgeComponent } from './badge.component';

const meta: Meta<BadgeComponent> = {
  title: 'Components/Badge',
  component: BadgeComponent,
  tags: ['autodocs'],
  args: {
    text: 'Badge',
  },
};

export default meta;
type Story = StoryObj<BadgeComponent>;

export const Primary: Story = {
  args: {
    text: 'Badge',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    text: 'Badge',
  },
};

export const Small = {
  args: {
    size: 'small',
    text: 'Badge',
  },
};
