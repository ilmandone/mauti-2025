import { AnimationParams, onScroll, stagger, TargetsParam } from 'animejs';

export const INTRO_DELAY_TIME = 140;

export const getFadeInVerticalAnimationParams = (
  target: TargetsParam | undefined,
  staggered = true,
  debug = false
): AnimationParams => {
  return {
    delay: staggered ? stagger(100, { start: 300 }) : 500,
    duration: staggered ? stagger(1000, { start: 700 }) : 1500,
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

export const getFadeInHorizontalAnimationParams = (
  target: TargetsParam | undefined = undefined,
  staggered = true,
  debug = false
): AnimationParams => {
  return {
    delay: staggered ? stagger(100, { start: 300 }) : 300,
    duration: staggered ? stagger(800, { start: 500 }) : 1200,
    x: [{ from: '-3vw' }, { to: 0 }],
    opacity: [{ from: 0 }, { to: 1 }],
    autoplay: onScroll({
      debug,
      target,
      enter: 'bottom top',
      leave: 'top bottom',
    }),
  };
};
