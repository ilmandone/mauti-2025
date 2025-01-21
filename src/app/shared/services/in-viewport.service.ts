import {ElementRef, Injectable, OnDestroy, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InViewportService implements OnDestroy {

  private _observer: IntersectionObserver;
  private _stepObserver: IntersectionObserver;

  currentSection = signal<{ el: Element, intersecting: boolean } | null>(null)
  intersectionRatio = signal<{ el: Element, ratio: number } | null>(null)

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
        threshold: [0, 0.15, 0.25, 0.35, 0.5, 0.65, 0.75, 0.85, 1],
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
