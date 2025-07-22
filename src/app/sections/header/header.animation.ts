import { animate, style, transition, trigger } from '@angular/animations';

export const soundMsgAnimation = trigger('soundMsgAnimation', [
  transition(':enter', [
    style({
      transform: 'translate(-20%,0)',
      opacity: 0,
    }),
    animate('222ms ease-in', style({ transform: 'translate(0,0)', opacity: 1 })),
  ]),
  transition(':leave', [
    style({
      transform: 'translate(0,0)',
      opacity: 1,
    }),
    animate('222ms ease-in', style({ transform: 'translate(-20%,0)', opacity: 0 })),
  ]),
]);
