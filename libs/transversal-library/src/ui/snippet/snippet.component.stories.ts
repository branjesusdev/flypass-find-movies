import type { Meta, StoryObj } from '@storybook/angular';
import { SnippetComponent } from './snippet.component';
import { fn } from '@storybook/test';

const meta: Meta<SnippetComponent> = {
  title: 'Components/Snippet',
  component: SnippetComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<SnippetComponent>;

export const Search: Story = {
  argTypes: {
    image: { control: 'text', description: 'Image URL' },
    title: { control: 'text', description: 'Title' },
    overview: { control: 'text', description: 'Overview' },
    releaseDate: { control: 'date', description: 'Release Date' },
    handleEvent: { action: 'handleEvent' },
  },

  args: {
    image: 'https://www.themoviedb.org/t/p/w440_and_h660_face//1XS1oqL89opfnbLl8WnZY1O1uJx.jpg',
    title: 'The Batman',
    overview:
      'In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while facing a serial killer known as the Riddler.',
    releaseDate: '2022-03-02',
    handleEvent: fn(),
  },
};
