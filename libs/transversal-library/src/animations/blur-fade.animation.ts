import { animate, state, style, transition, trigger } from '@angular/animations';

export const blurFade = trigger('blurFade', [
  state(
    'loading',
    style({
      filter: 'blur(20px)',
      opacity: 0,
    }),
  ),

  state(
    'loaded',
    style({
      filter: 'blur(0)',
      opacity: 1,
    }),
  ),

  transition('loading => loaded', [animate('0.5s ease-in')]),
]);
