import { animate, style, transition, trigger } from '@angular/animations';

export const shrinkAnimation = trigger('shrinkAnimation', [
  transition(':enter', [
    style({
      height: '0.15rem',
      width: '0.15rem',
      transform: 'scale(0)',
    }),
    animate(
      '222ms ease-in-out',
      style({
        height: '*',
        width: '*',
        transform: 'scale(1)',
      })
    ),
  ]),
  transition(':leave', [
    style({
      height: '*',
      width: '*',
      transform: 'scale(1)',
    }),
    animate(
      '222ms ease-in-out',
      style({
        height: '0.15rem',
        width: '0.15rem',
        transform: 'scale(0)',
      })
    ),
  ]),
]);
