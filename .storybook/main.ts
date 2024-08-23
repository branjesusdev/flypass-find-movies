import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  'stories': ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)', '../libs/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  'addons': [
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/addon-themes'
  ],
  'framework': {
    'name': '@storybook/angular',
    'options': {},
  },
};
export default config;
