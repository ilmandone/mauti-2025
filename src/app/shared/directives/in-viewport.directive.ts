import {Directive, ElementRef, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';

@Directive({
  selector: '[inViewport]'
})
export class InViewportDirective implements OnInit, OnDestroy{

  @Output() visibilityChange = new EventEmitter<boolean>();

  private observer: IntersectionObserver;

  constructor(private elementRef: ElementRef) {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        this.visibilityChange.emit(entry.isIntersecting);
      },
      {
        threshold: [0, 1],
        rootMargin: '0px'
      }
    );
  }

  ngOnInit() {
    this.observer.observe(this.elementRef.nativeElement);
  }

  ngOnDestroy() {
    this.observer.disconnect();
  }
}
