import { animate, state, style, transition, trigger } from '@angular/animations';

export const shrinkAnimation = trigger('shrinkAnimation', [
  state(
    'normal',
    style({
      height: '*',
      width: '*',
      transform: 'scale(1)',
    })
  ),
  state(
    'shrunk',
    style({
      height: '0.15rem',
      width: '0.15rem',
      transform: 'scale(0)',
    })
  ),
  transition('normal <=> shrunk', [animate('0.222s ease-in-out')]),
]);
