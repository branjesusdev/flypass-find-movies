import { Meta, type StoryObj } from '@storybook/angular';
import { BadgeComponent } from './badge.component';
import { userEvent, within, expect } from '@storybook/test';

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
    text: 'Badge Primary',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const badge = canvas.getByRole('contentinfo');
    await userEvent.click(badge);

    expect(canvas.getByText('Badge Primary')).toBeInTheDocument();
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    text: 'Badge Large',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const badge = canvas.getByRole('contentinfo');
    await userEvent.click(badge);

    expect(canvas.getByText('Badge Large')).toBeInTheDocument();
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    text: 'Badge Small',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const badge = canvas.getByRole('contentinfo');
    await userEvent.click(badge);

    expect(canvas.getByText('Badge Small')).toBeInTheDocument();
  },
};
