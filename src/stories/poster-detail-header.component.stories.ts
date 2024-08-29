import { PosterDetailHeaderComponent } from "@pages/poster-details/components/poster-detail-header/poster-detail-header.component";
import { DetailPoster } from "@shared/core/domain/entity";
import type { Meta, StoryObj } from '@storybook/angular';

const mockData: DetailPoster = {
  id: 1,
  name: 'The Avengers',
  overview: 'Overview',
  poster_path: 'https://www.google.com',
  vote_average: 5,
  genres: ['Action', 'Adventure'],
  tagline: 'Tagline',
  media_type: 'Movie',
  release_date: new Date(),
  runtime: 120,
  number_of_episodes: 0,
  first_air_date: new Date(),
  number_of_seasons: 0,
  popularity: 0,
  production_companies: ['Marvel'],
  production_countries: ['USA'],
  spoken_languages: ['English'],

}

const meta: Meta<PosterDetailHeaderComponent> = {
  title: 'App/PosterDetailHeader',
  component: PosterDetailHeaderComponent,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    posterHeader: mockData
  },
}

export default meta;

type Story = StoryObj<PosterDetailHeaderComponent>;

export const Primary: Story = {
  args: {
    posterHeader: mockData
  },
};
