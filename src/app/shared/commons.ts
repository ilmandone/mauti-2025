import { onScroll, stagger } from 'animejs';

export const INTRO_DELAY_TIME = 140;

export const getHugeTextAnimationOptions = (target: string = '.huge') => {
  return {
    delay: stagger(100, { start: 200 }),
    duration: stagger(1000, { start: 600 }),
    opacity: [{ from: 0 }, { to: 1 }],
    y: [{ from: 60 }, { to: 0 }],
    autoplay: onScroll({
      target,
      enter: 'bottom top',
      leave: 'top bottom',
    }),
  };
};
