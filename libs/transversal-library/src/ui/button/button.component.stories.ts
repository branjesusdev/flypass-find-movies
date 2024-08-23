import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from '@storybook/test';
import { ButtonComponent } from './button.component';

const meta: Meta<ButtonComponent> = {
  title: 'Components/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  argTypes: {},
  args: { handleClick: fn() },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

export const Primary: Story = {
  args: {
    primary: true,
    text: 'Button',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    text: 'Button',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    text: 'Button',
  },
};
