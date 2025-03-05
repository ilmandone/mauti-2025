import { Component, computed, DestroyRef, effect, ElementRef, inject, input, OnInit, signal } from '@angular/core';
import { debounceTime, fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Coords2D } from '../../shared/commons';
import { getAngle } from '@components/char-spinner/char-spinner.utils';

@Component({
  selector: 'char-spinner',
  imports: [],
  template: ` <div [style.color]="currentColor()">{{ CHAR_MAP[currentAngle()] }}</div> `,
  styleUrl: './char-spinner.component.scss',
})
export class CharSpinnerComponent implements OnInit {
  private _dRef = inject(DestroyRef);
  private _el = inject(ElementRef).nativeElement as HTMLElement;

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

  enabled = input<boolean>(true);
  data = input<Coords2D | number | 'standalone'>();
  primaryColAngles = input<number[]>([90, 135, 180, 225]);

  currentAngle = signal<number>(0);
  currentColor = computed(() => {
    const a = this.currentAngle();
    return `var(${this.primaryColAngles().includes(a) ? '--primary-color' : '--secondary-color'})`;
  });

  constructor() {
    effect(() => {
      if (!this.enabled()) return;

      const mc = this.data();
      this.currentAngle.set(
        mc && mc !== 'standalone'
          ? typeof mc === 'number'
            ? this._snapTo45Degrees(Math.round(mc))
            : this._getSnapAngle(mc)
          : 0
      );
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
    return this._snapTo45Degrees(getAngle(p, this._elPos));
  }

  /**
   * Get element center position
   * @private
   */
  private _getElPos(): Coords2D {
    const bb = this._el.getBoundingClientRect();

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
    if (this.data() === 'standalone') {
      this._mouseEvt$.pipe(takeUntilDestroyed(this._dRef)).subscribe((r) => {
        if (!this.enabled()) return;

        this.currentAngle.set(this._getSnapAngle(r));
      });
    }

    // Listen window resize to update element position
    this._resizeEvt$.pipe(takeUntilDestroyed(this._dRef)).subscribe(() => {
      this._elPos = this._getElPos();
    });
  }
}
