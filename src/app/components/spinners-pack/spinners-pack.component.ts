import { Component, computed, DestroyRef, ElementRef, inject, OnInit, output, signal, viewChild } from '@angular/core';
import { debounceTime, fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Coords2D, REGISTRATION_DELAY } from '../../shared/commons';
import { CharSpinnerComponent } from '@components/char-spinner/char-spinner.component';

@Component({
  selector: 'spinners-pack',
  imports: [CharSpinnerComponent],
  template: `
    @if (spinnersAmount()) {
      @for (s of spinnersList(); track $index) {
        <char-spinner [data]="mouseCoords"/>
      }
    }
    <!-- Hidden component useful for spinner char width calculation -->
    <char-spinner [data]="{ x: 0, y: 0 }" class="hidden" #sample />
  `,
  styleUrl: './spinners-pack.component.scss',
})
export class SpinnersPackComponent implements OnInit {
  private _dRef = inject(DestroyRef);
  private _elN: HTMLElement = inject(ElementRef).nativeElement;

  private _mouseEvt$ = fromEvent<MouseEvent>(document, 'mousemove');
  private _resizeEvt$ = fromEvent(window, 'resize').pipe(debounceTime(50));

  private _frameRequest: number | null = null
  private _spinnersTotal!: number

  active = output<boolean>()

  sample = viewChild('sample', { read: ElementRef });
  spinnersAmount = signal<number>(0)
  spinnersList = computed(() => {
    return new Array(this.spinnersAmount())
  })

  mouseCoords!: Coords2D;

  /**
   * Calculate the amount of spinner
   * @description Use host width and sampler width to get value
   * @private
   */
  private _getSpinnerAmount(): number {
    const w = this._elN.offsetWidth > this._elN.offsetHeight ? this._elN.offsetWidth : this._elN.offsetHeight;
    const fs = (this.sample()?.nativeElement as HTMLElement).offsetWidth + 1;

    return Math.round(w / fs);
  }

  /**
   * Clear the animation and enable spinners
   * @private
   */
  private _clearAnimation() {
    if (this._frameRequest) {

      cancelAnimationFrame(this._frameRequest)

      this._frameRequest = null
      this.active.emit(true)
    }
  }

  /**
   * Show progressively the spinners
   * @description user request animation frame to show spinners
   * @private
   */
  private _showSpinners() {
    const sa = this.spinnersAmount()
    if(sa < this._spinnersTotal) {
      this.spinnersAmount.update(value => value + 1);
      this._frameRequest = requestAnimationFrame(this._showSpinners.bind(this))
    } else
      this._clearAnimation()

  }

  ngOnInit() {

    // Start mouse event listener
    this._mouseEvt$.pipe(takeUntilDestroyed(this._dRef)).subscribe((e) => {
      this.mouseCoords = { x: e.clientX, y: e.clientY };
    });

    // Resize event to calculate the amount of spinner characters
    this._resizeEvt$.pipe(takeUntilDestroyed(this._dRef)).subscribe(() => {
      this._clearAnimation()
      this.spinnersAmount.set(this._getSpinnerAmount())
    });

    // Start pack after a little delay
    setTimeout(() => {
      this._spinnersTotal = this._getSpinnerAmount();
      this._frameRequest = requestAnimationFrame(this._showSpinners.bind(this))
    }, REGISTRATION_DELAY);
  }
}
