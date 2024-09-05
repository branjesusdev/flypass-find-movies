import type { Meta, StoryObj } from '@storybook/angular';
import { fn, userEvent, within, expect } from '@storybook/test';
import { ButtonComponent } from './button.component';

const meta: Meta<ButtonComponent> = {
  title: 'Components/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'radio', options: ['primary', 'secondary'] },
      description: 'Button type',
    },
    text: { control: 'text', description: 'Button text' },
    size: {
      control: { type: 'radio', options: ['small', 'medium', 'large'] },
      description: 'Button size',
    },
    isDefaultIcon: { control: 'boolean', description: 'Button default icon' },
  },
  args: { handleClick: fn() },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

export const Primary: Story = {
  args: {
    type: 'primary',
    text: 'Button Primary',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await userEvent.click(button);

    expect(canvas.getByText('Button Primary')).toBeInTheDocument();
  },
};

export const Secondary: Story = {
  args: {
    type: 'secondary',
    text: 'Button Secondary',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await userEvent.click(button);

    expect(canvas.getByText('Button Secondary')).toBeInTheDocument();
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    text: 'Button Large',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await userEvent.click(button);

    expect(canvas.getByText('Button Large')).toBeInTheDocument();
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    text: 'Button Small',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await userEvent.click(button);

    expect(canvas.getByText('Button Small')).toBeInTheDocument();
  },
};
