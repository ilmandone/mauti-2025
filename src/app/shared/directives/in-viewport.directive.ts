import {Directive, effect, ElementRef, inject, OnDestroy, OnInit, output} from '@angular/core';
import {InViewportService} from '../services/in-viewport.service';

@Directive({
  selector: '[inViewport]'
})
export class InViewportDirective implements OnInit, OnDestroy{

  private _elementRef = inject(ElementRef)
  private _inViewportSrv = inject(InViewportService)

  visibilityChange = output<boolean>()
  visibilityRatio = output<number>()

  constructor() {
    effect(() => {
      const currentSection = this._inViewportSrv.currentSection()
      if (currentSection?.el) {
        this.visibilityChange.emit(currentSection.el === this._elementRef.nativeElement && currentSection.intersecting)
      }
    });

    effect(() => {
      const r = this._inViewportSrv.intersectionRatio()
      if (r && this._elementRef.nativeElement === r.el) {
        this.visibilityRatio.emit(r.ratio)
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
