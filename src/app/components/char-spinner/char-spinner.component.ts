import { Component, DestroyRef, effect, ElementRef, inject, input, OnInit } from '@angular/core';
import { debounceTime, fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Coords2D } from '../../shared/commons';

@Component({
  selector: 'char-spinner',
  imports: [],
  template: ` <div>{{ CHAR_MAP[currentAngle ?? 0] }}</div> `,
  styleUrl: './char-spinner.component.scss',
})
export class CharSpinnerComponent implements OnInit {
  private _dRef = inject(DestroyRef);
  private _nEl = inject(ElementRef).nativeElement as HTMLElement;

  private _elPos!: Coords2D;
  private _mouseEvt$ = fromEvent<MouseEvent>(document, 'mousemove');
  private _resizeEvt$ = fromEvent(window, 'resize').pipe(debounceTime(100));

  readonly CHAR_MAP: Record<number, string> = {
    0: '|',
    45: '/',
    90: '-',
    135: '\\',
    180: '|',
    225: '/',
    270: '-',
    315: '\\',
  };

  enabled = input<boolean>(true)
  mousePos = input<Coords2D | 'standalone'>();

  currentAngle = 0;

  constructor() {
    effect(() => {
      if (!this.enabled()) return

      const mc = this.mousePos();
      this.currentAngle = mc && mc !== 'standalone' ? this._getSnapAngle(mc as Coords2D) : 0;
    });
  }

  /**
   * Get angle related to component position
   * @description The value is a multiple of 45 degrees
   * @private
   * @param {Coords2D} p
   */
  private _getSnapAngle(p: Coords2D): number {
    if (!this._elPos) return 0;

    const deltaX = p.x - this._elPos.x;
    const deltaY = p.y - this._elPos.y;
    const angle = Math.atan2(deltaY, deltaX) + Math.PI / 2;

    return this._snapTo45Degrees(Math.round(((angle * 180) / Math.PI + 360) % 360));
  }

  /**
   * Get element center position
   * @private
   */
  private _getElPos(): Coords2D {
    const bb = this._nEl.getBoundingClientRect();

    return {
      x: bb.x + bb.width / 2,
      y: bb.y + bb.height / 2,
    };
  }

  /**
   * Snap angle value to 45 degrees multiple
   * @param angle
   * @private
   */
  private _snapTo45Degrees(angle: number): number {
    const snapped = Math.round(angle / 45) * 45;

    return snapped === 360 ? 0 : snapped;
  }

  ngOnInit() {
    // Initialize the component after 100 ms to get correct size and position
    // Note: an external interceptor observer could be used to initialize the component
    this._elPos = this._getElPos();

    // Enable mouse tracking only if external coords are not provided
    if (this.mousePos() === 'standalone') {
      this._mouseEvt$.pipe(takeUntilDestroyed(this._dRef)).subscribe((r) => {
        if (!this.enabled()) return

        this.currentAngle = this._getSnapAngle(r);
      });
    }

    // Listen window resize to update element position
    this._resizeEvt$.pipe(takeUntilDestroyed(this._dRef)).subscribe(() => {
      this._elPos = this._getElPos();
    });
  }
}
