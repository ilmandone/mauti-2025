import {ElementRef, Injectable, OnDestroy, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InViewportService implements OnDestroy{

  private _observer: IntersectionObserver;

  currentSection = signal<{el:Element,  intersecting: boolean} | null>(null)

  constructor() {
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
        rootMargin: '0px'
      }
    );
  }

  add(e: ElementRef) {
    this._observer.observe(e.nativeElement)
  }

  remove(e: ElementRef) {
    this._observer.unobserve(e.nativeElement)
  }

  ngOnDestroy() {
    this._observer.disconnect()
  }
}
