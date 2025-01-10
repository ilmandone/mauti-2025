import {Directive, effect, ElementRef, EventEmitter, inject, OnDestroy, OnInit, Output} from '@angular/core';
import {InViewportService} from '../services/in-viewport.service';

@Directive({
  selector: '[inViewport]'
})
export class InViewportDirective implements OnInit, OnDestroy{

  private _elementRef = inject(ElementRef)
  private _inViewportSrv = inject(InViewportService)

  @Output() visibilityChange = new EventEmitter<boolean>();

  constructor() {
    effect(() => {
      const currentSection = this._inViewportSrv.currentSection()
      if (currentSection?.el) {
        this.visibilityChange.emit(currentSection.el === this._elementRef.nativeElement && currentSection.intersecting)
      }
    });
  }


  ngOnInit() {
    this._inViewportSrv.add(this._elementRef)
  }

  ngOnDestroy() {
    this._inViewportSrv.remove(this._elementRef)
  }
}
