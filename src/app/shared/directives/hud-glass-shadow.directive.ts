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
  private _requestAnimationFrameId: number | null = null;

  autoUpdate = input<boolean>(false);
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
      x: -Math.round((bb.left + bb.width / 2 - iw / 2) / (iw / 60)),
      y: Math.round((bb.top + bb.height / 2 - ih / 2) / (ih / 60)),
    };

    const halfCX = c.x * 0.5;
    const bf = this._getBlurFactor(c.x);

    this._el.style.filter = `
      blur(${bf}px)
      drop-shadow(${halfCX}px ${c.y / 2 - vh}px 1px rgba(${this.hudColor()}, ${this.hudAlpha()}))
      drop-shadow(${-halfCX}px ${c.y + vh}px 2px var(--hud-color))`;

    this._el.style.transform = `scale(${1 + Math.abs(c.x * 0.01)}) rotateY(${halfCX}deg)`;

    if (this._requestAnimationFrameId) window.requestAnimationFrame(this._update.bind(this));
  }

  constructor() {
    effect(() => {
      if (this.update()) this._update();
    });

    effect(() => {
      const au = this.autoUpdate();
      if (au) {
        this._requestAnimationFrameId = window.requestAnimationFrame(this._update.bind(this));
      } else if (this._requestAnimationFrameId) {
        window.cancelAnimationFrame(this._requestAnimationFrameId);
        this._requestAnimationFrameId = null;
      }
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
