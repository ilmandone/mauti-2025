import { ElementRef, Injectable, OnDestroy, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InViewportService implements OnDestroy {
  private _stepObserver: IntersectionObserver;

  intersectionRatio = signal<{ el: Element; ratio: number; intersecting: boolean } | null>(null);

  private _getThresholds(steps = 10) {
    return Array.from({ length: steps + 1 }, (_, index) => Number((index * (1 / steps)).toFixed(3)));
  }

  constructor() {
    this._stepObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting)
          this.intersectionRatio.set({
            el: entry.target,
            ratio: entry.intersectionRatio,
            intersecting: entry.isIntersecting,
          });
      },
      {
        threshold: this._getThresholds(20),
        rootMargin: '-20%',
      }
    );
  }

  add(e: ElementRef) {
    this._stepObserver.observe(e.nativeElement);
  }

  remove(e: ElementRef) {
    this._stepObserver.unobserve(e.nativeElement);
  }

  ngOnDestroy() {
    this._stepObserver.disconnect();
  }
}
