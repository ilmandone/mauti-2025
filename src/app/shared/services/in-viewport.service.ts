import {ElementRef, Injectable, OnDestroy, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InViewportService implements OnDestroy {

  private _observer: IntersectionObserver;
  private _stepObserver: IntersectionObserver;

  currentSection = signal<{ el: Element, intersecting: boolean } | null>(null)
  intersectionRatio = signal<{ el: Element, ratio: number } | null>(null)

  private _getThresholds(steps = 10) {
    return Array.from({length: steps + 1}, (_, index) => Number((index * (1 / steps)).toFixed(3)));
  }

  constructor() {

    this._stepObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting)
          this.intersectionRatio.set({
            el: entry.target,
            ratio: entry.intersectionRatio
          })
      },
      {
        threshold: this._getThresholds(),
        rootMargin: '-10%'
      }
    );

    this._observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting)

          this.currentSection.set({
            el: entry.target,
            intersecting: entry.isIntersecting
          })
      },
      {
        threshold: [0.5],
        rootMargin: '-10%'
      }
    );
  }

  add(e: ElementRef) {
    this._observer.observe(e.nativeElement)
    this._stepObserver.observe(e.nativeElement)
  }

  remove(e: ElementRef) {
    this._observer.unobserve(e.nativeElement)
    this._stepObserver.unobserve(e.nativeElement)
  }

  ngOnDestroy() {
    this._observer.disconnect()
    this._stepObserver.disconnect()
  }
}
