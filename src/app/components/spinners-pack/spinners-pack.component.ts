import { Component, DestroyRef, ElementRef, inject, OnInit, viewChild } from '@angular/core';
import { debounceTime, fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Coords2D, REGISTRATION_DELAY } from '../../shared/commons';
import { CharSpinnerComponent } from '@components/char-spinner/char-spinner.component';

@Component({
  selector: 'spinners-pack',
  imports: [CharSpinnerComponent],
  template: `
    @if (spinnersAmount) {
      @for (s of [].constructor(spinnersAmount); track $index) {
        <char-spinner [data]="mouseCoords" />
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

  sample = viewChild('sample', { read: ElementRef });

  mouseCoords!: Coords2D;
  spinnersAmount!: number;

  private _getSpinnerAmount(): number {
    const w = this._elN.offsetWidth > this._elN.offsetHeight ? this._elN.offsetWidth : this._elN.offsetHeight;
    const fs = (this.sample()?.nativeElement as HTMLElement).offsetWidth + 1;

    return Math.round(w / fs);
  }

  ngOnInit() {
    // Start mouse event listener
    this._mouseEvt$.pipe(takeUntilDestroyed(this._dRef)).subscribe((e) => {
      this.mouseCoords = { x: e.clientX, y: e.clientY };
    });

    // Resize event to calculate the amount of spinner characters
    this._resizeEvt$.pipe(takeUntilDestroyed(this._dRef)).subscribe(() => {
      this.spinnersAmount = this._getSpinnerAmount();
    });

    // Start pack after a little delay
    setTimeout(() => {
      this.spinnersAmount = this._getSpinnerAmount();
    }, REGISTRATION_DELAY);
  }
}
