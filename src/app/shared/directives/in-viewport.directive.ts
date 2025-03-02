import { Directive, effect, ElementRef, inject, OnDestroy, OnInit, output } from '@angular/core';
import { InViewportService } from '../services/in-viewport.service';

@Directive({
  selector: '[inViewport]',
})
export class InViewportDirective implements OnInit, OnDestroy {
  private _elementRef = inject(ElementRef);
  private _inViewportSrv = inject(InViewportService);

  changed = output<{ visible: boolean; ratio: number }>();

  constructor() {
    effect(() => {
      const r = this._inViewportSrv.intersectionRatio();
      const cs = this._inViewportSrv.currentSection();

      if (r && this._elementRef.nativeElement === r.el && cs?.el) {
        this.changed.emit({ visible: cs.intersecting, ratio: r.ratio });
      }
    });
  }

  ngOnInit() {
    this._inViewportSrv.add(this._elementRef);
  }

  ngOnDestroy() {
    this._inViewportSrv.remove(this._elementRef);
  }
}
