import type { Meta, StoryObj } from '@storybook/angular';
import { InputComponent } from './input.component';
import { fn } from '@storybook/test';
import { signal } from '@angular/core';

const meta: Meta<InputComponent> = {
  title: 'Components/Input',
  component: InputComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<InputComponent>;

export const Search: Story = {
  args: {
    placeholder: 'Input',
    name: 'input',
  },
};
