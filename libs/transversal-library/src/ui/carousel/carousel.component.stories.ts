import { Meta, StoryObj } from '@storybook/angular';
import { CarouselComponent } from './carousel.component';

const mockItems = [
  {
    title: 'Card Poster',
    overview: 'Description of the card poster',
    poster_path:
      'https://www.themoviedb.org/t/p/w440_and_h660_face//qoQQ1jnCNBzcIl1VO0XgC4yhL3N.jpg',
    id: 14555,
    media_type: 'movie',
    vote_average: 9.5,
  },
  {
    title: 'Card Poster',
    overview: 'Description of the card poster',
    poster_path:
      'https://www.themoviedb.org/t/p/w440_and_h660_face//1XS1oqL89opfnbLl8WnZY1O1uJx.jpg',
    id: 14555,
    media_type: 'movie',
    vote_average: 9.6,
  },
  {
    title: 'Card Poster',
    overview: 'Description of the card poster',
    poster_path:
      'https://www.themoviedb.org/t/p/w440_and_h660_face//7QMsOTMUswlwxJP0rTTZfmz2tX2.jpg',
    id: 14555,
    media_type: 'movie',
    vote_average: 8.5,
  },
  {
    title: 'Card Poster',
    overview: 'Description of the card poster',
    poster_path:
      'https://www.themoviedb.org/t/p/w440_and_h660_face//gdIrmf2DdY5mgN6ycVP0XlzKzbE.jpg',
    id: 14555,
    media_type: 'series',
    vote_average: 6.5,
  },
  {
    title: 'Card Poster',
    overview: 'Description of the card poster',
    poster_path:
      'https://www.themoviedb.org/t/p/w440_and_h660_face//9E2y5Q7WlCVNEhP5GiVTjhEhx1o.jpg',
    id: 14555,
    media_type: 'series',
    vote_average: 5.5,
  },
  {
    title: 'Card Poster',
    overview: 'Description of the card poster',
    poster_path:
      'https://www.themoviedb.org/t/p/w440_and_h660_face//vfrQk5IPloGg1v9Rzbh2Eg3VGyM.jpg',
    id: 14555,
    media_type: 'movie',
    vote_average: 5.5,
  },
  {
    title: 'Card Poster',
    overview: 'Description of the card poster',
    poster_path:
      'https://www.themoviedb.org/t/p/w440_and_h660_face//ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg',
    id: 14555,
    media_type: 'series',
    vote_average: 9.9,
  },
];

const meta: Meta = {
  title: 'Components/Carousel',
  component: CarouselComponent,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    items: mockItems,
    key: 'swiper-key',
  },
};

export default meta;
type Story = StoryObj<CarouselComponent>;

export const Default: Story = {
  args: {
    items: mockItems,
    key: 'swiper-key',
  },
};
