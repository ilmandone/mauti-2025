import { AfterViewInit, DestroyRef, Directive, ElementRef, inject } from '@angular/core';
import { debounceTime, fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
  selector: '[hudGlassShadow]',
})
export class HudGlassShadowDirective implements AfterViewInit {
  private _destroyRef = inject(DestroyRef);
  private _el = inject(ElementRef).nativeElement as HTMLElement;

  private _resizeEvt$ = fromEvent(window, 'resize').pipe(debounceTime(50));

  private _update() {
    const iw = window.innerWidth;
    const ih = window.innerHeight;
    const vh = Math.round(ih / 200);
    const c = {
      x: Math.round(Math.abs(this._el.offsetLeft + this._el.offsetWidth / 2 - iw / 2) / 100),
      y: Math.round(Math.abs(this._el.offsetTop + this._el.offsetHeight / 2 - ih / 2) / 100),
    };

    this._el.style.filter = `
      drop-shadow(${c.x / 2}px ${c.y / 2 + vh}px 0 rgba(255,0,0,0.4))
      drop-shadow(${c.x}px ${c.y + vh}px 2px rgba(255,0,0,0.3))
      `;
  }

  ngAfterViewInit() {
    this._resizeEvt$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
      this._update();
    });

    setTimeout(() => {
      this._update();
    }, 10);
  }
}
