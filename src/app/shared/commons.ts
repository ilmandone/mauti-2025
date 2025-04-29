import { onScroll, stagger, TargetsParam } from 'animejs';

export const INTRO_DELAY_TIME = 140;

export const getTitleAnimationOptions = (
  target: TargetsParam | undefined,
  staggered: boolean = true,
  debug = false
) => {
  return {
    delay: staggered ? stagger(100, { start: 300 }) : 300,
    duration: staggered ? stagger(1000, { start: 700 }) : 1000,
    opacity: [{ from: 0 }, { to: 1 }],
    y: [{ from: 60 }, { to: 0 }],
    autoplay: onScroll({
      debug,
      target,
      enter: 'bottom top',
      leave: 'top bottom',
    }),
  };
};
