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

  private _update() {
    const iw = window.innerWidth;
    const ih = window.innerHeight;
    const vh = Math.round((iw < ih ? iw : ih) / 200);
    const bb = this._el.getBoundingClientRect();
    const c = {
      x: -Math.round((bb.left + bb.width / 2 - iw / 2) / (iw / 80)),
      y: Math.round((bb.top + bb.height / 2 - ih / 2) / (ih / 60)),
    };

    this._el.style.filter = `
      drop-shadow(${c.x / 2}px ${c.y / 2 + vh}px 1px rgba(${this.hudColor()}, ${this.hudAlpha()}))
      drop-shadow(${c.x}px ${c.y + vh}px 3px rgba(${this.hudColor()}, ${this.hudAlpha() / 2}))
      `;
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

    setTimeout(() => {
      this._update();
    }, 10);
  }
}
