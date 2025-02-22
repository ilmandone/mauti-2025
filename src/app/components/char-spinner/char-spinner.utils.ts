import { Coords2D } from '../../shared/commons';

export const getAngle = (p: Coords2D, elPos: Coords2D): number => {

  const deltaX = p.x - elPos.x;
  const deltaY = p.y - elPos.y;
  const angle = Math.atan2(deltaY, deltaX) + Math.PI / 2;

  return Math.round(((angle * 180) / Math.PI + 360) % 360);
}
