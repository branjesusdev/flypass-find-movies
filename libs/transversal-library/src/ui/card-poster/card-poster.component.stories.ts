import type { Meta, StoryObj } from '@storybook/angular';
import { CardPosterComponent } from './card-poster.component';

const meta: Meta<CardPosterComponent> = {
  title: 'Components/Card Poster',
  component: CardPosterComponent,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    title: 'Card Poster',
    description: 'Description of the card poster',
    img: 'https://www.themoviedb.org/t/p/w440_and_h660_face//qoQQ1jnCNBzcIl1VO0XgC4yhL3N.jpg',
    vote: 9.5,
  },
};

export default meta;
type Story = StoryObj<CardPosterComponent>;

export const Default: Story = {
  args: {
    title: 'Card Poster',
    description: 'Description of the card poster',
    img: 'https://www.themoviedb.org/t/p/w440_and_h660_face//1XS1oqL89opfnbLl8WnZY1O1uJx.jpg',
    vote: 8.5,
  },
};
