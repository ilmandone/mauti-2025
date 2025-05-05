import { AnimationParams, onScroll, ScrollObserver, stagger, TargetsParam } from 'animejs';

/**
 * Return anime js onScroll plugin with default configuration
 * @param target {TargetsParam | undefined}
 * @param debug {boolean}
 */
export const getDefaultScrollObs = (
  target: TargetsParam | undefined = undefined,
  debug: boolean = false
): ScrollObserver => {
  return onScroll({
    debug,
    target,
    enter: 'bottom top',
    leave: 'top bottom',
  });
};
/**
 * Return anime js options for vertical fade in animation
 * @param target {TargetsParam | undefined}
 * @param staggered {boolean}
 * @param debug {boolean}
 */
export const getFadeInVerticalAnimationParams = (
  target: TargetsParam | undefined,
  staggered: boolean = true,
  debug: boolean = false
): AnimationParams => {
  return {
    delay: staggered ? stagger(100, { start: 300 }) : 500,
    duration: staggered ? stagger(1000, { start: 700 }) : 1500,
    opacity: [{ from: 0 }, { to: 1 }],
    y: [{ from: 60 }, { to: 0 }],
    autoplay: getDefaultScrollObs(target, debug),
  };
};
/**
 * Return anime js options for horizontal fade in animation
 * @param target {TargetsParam | undefined}
 * @param staggered {boolean}
 * @param debug {boolean}
 */
export const getFadeInHorizontalAnimationParams = (
  target: TargetsParam | undefined = undefined,
  staggered: boolean = true,
  debug: boolean = false
): AnimationParams => {
  return {
    delay: staggered ? stagger(100, { start: 300 }) : 300,
    duration: staggered ? stagger(800, { start: 500 }) : 1200,
    x: [{ from: '-3vw' }, { to: 0 }],
    opacity: [{ from: 0 }, { to: 1 }],
    autoplay: getDefaultScrollObs(target, debug),
  };
};
