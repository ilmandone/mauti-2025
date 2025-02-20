import { Component, DestroyRef, effect, ElementRef, inject, input, OnInit, output } from '@angular/core';
import { debounceTime, fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Coords2D } from '../../shared/commons';

@Component({
  selector: 'char-spinner',
  imports: [],
  template: ` <div>{{ CHAR_MAP[currentAngle!] }}</div> `,
  styleUrl: './char-spinner.component.scss',
})
export class CharSpinnerComponent implements OnInit {
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

  private _dRef = inject(DestroyRef);
  private _nEl = inject(ElementRef).nativeElement as HTMLElement;

  private _elPos!: Coords2D;
  private _mouseEvt$ = fromEvent<MouseEvent>(document, 'mousemove').pipe(takeUntilDestroyed(this._dRef));
  private _resizeEvt$ = fromEvent(window, 'resize').pipe(debounceTime(150), takeUntilDestroyed(this._dRef));

  mousePos = input<Coords2D>();
  width = output<number>();

  currentAngle = 0;

  constructor() {
    effect(() => {
      const mc = this.mousePos();
      if (mc)
      this.currentAngle = this._getSnapAngle(mc);
    });
  }

  /**
   * Get angle related to component position
   * @description The value is a multiple of 45 degrees
   * @param {MouseEvent} event
   * @private
   */
  private _getSnapAngle(p: Coords2D): number {
    const deltaX = p.x - this._elPos.x;
    const deltaY = p.y - this._elPos.y;

    const angle = Math.atan2(deltaY, deltaX) + Math.PI / 2;
    return this._snapTo45Degrees(Math.round(((angle * 180) / Math.PI + 360) % 360));
  }

  /**
   * Get element center position
   * @private
   */
  private _getPosAndWidth(): { coords: Coords2D; width: number } {
    const bb = this._nEl.getBoundingClientRect();
    return {
      coords: {
        x: bb.x + bb.width / 2,
        y: bb.y + bb.height / 2,
      },
      width: bb.width,
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

  private _setCoordsAndWidth(d: { coords: Coords2D; width: number }) {
    this._elPos = d.coords;
    this.width.emit(d.width);
  }

  ngOnInit() {
    // Initialize the component after 100 ms to get correct size and position
    // Note: an external interceptor observer could be used to initialize the component

    setTimeout(() => {
      this._setCoordsAndWidth(this._getPosAndWidth());

      // Enable mouse tracking only if external coords are not provided

      if (this.mousePos() === undefined) {
        this._mouseEvt$.subscribe((r) => {
          this.currentAngle = this._getSnapAngle(r);
        });
      }
      this._resizeEvt$.subscribe(() => {
        this._setCoordsAndWidth(this._getPosAndWidth());
      });
    }, 100);
  }
}
