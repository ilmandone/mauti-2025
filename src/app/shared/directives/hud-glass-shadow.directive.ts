import { AfterViewInit, DestroyRef, Directive, effect, ElementRef, inject, input } from '@angular/core';
import { debounceTime, fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
  selector: '[hudGlassShadow]',
})
export class HudGlassShadowDirective implements AfterViewInit {
  private _destroyRef = inject(DestroyRef);
  private _el = inject(ElementRef).nativeElement as HTMLElement;

  private _resizeEvt$ = fromEvent(window, 'resize').pipe(debounceTime(50));

  update = input<unknown>();
  hudColor = input<string>('246, 21, 57');
  hudAlpha = input<number>(0.4);

  private _getBlurFactor(x: number): number {
    const xAbs = Math.pow(Math.abs(x * 0.05), 1.5);
    return Math.round(xAbs);
  }

  private _update() {
    const iw = window.innerWidth;
    const ih = window.innerHeight;
    const vh = Math.round((iw < ih ? iw : ih) / 400);
    const bb = this._el.getBoundingClientRect();
    const c = {
      x: -Math.round((bb.left + bb.width / 2 - iw / 2) / (iw / 80)),
      y: Math.round((bb.top + bb.height / 2 - ih / 2) / (ih / 60)),
    };

    const halfCX = c.x * 0.5;
    const bf = this._getBlurFactor(c.x);

    this._el.style.filter = `
      blur(${bf}px)
      drop-shadow(${halfCX}px ${c.y / 2 - vh}px 1px rgba(${this.hudColor()}, ${this.hudAlpha()}))
      drop-shadow(${-halfCX}px ${c.y + vh}px 2px var(--hud-color))`;
    this._el.style.transform = `translateZ(${Math.abs(c.x) * (iw * 0.0025)}px) rotateY(${halfCX}deg)`;
  }

  constructor() {
    effect(() => {
      if (this.update()) this._update();
    });
  }

  ngAfterViewInit() {
    this._el.classList.add('hud-glass-transition');
    this._resizeEvt$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
      this._update();
    });

    const pn = this._el.parentNode as HTMLElement;
    if (pn) {
      pn.style.perspective = `50vw`;
      pn.style.transformStyle = 'preserve-3D';
    }

    setTimeout(() => {
      this._update();
    }, 10);
  }
}
