import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Coords2D } from '../../shared/commons';
import { CharSpinnerComponent } from '@components/char-spinner/char-spinner.component';

@Component({
  selector: 'spinners-pack',
  imports: [CharSpinnerComponent],
  template: `
    <char-spinner [mousePos]="mouseCoords"/>
  `,
  styleUrl: './spinners-pack.component.scss',
})
export class SpinnersPackComponent implements OnInit {
  private _mouseEvt$ = fromEvent<MouseEvent>(document, 'mousemove');
  private _dRef = inject(DestroyRef);

  mouseCoords!: Coords2D;

  ngOnInit() {
    this._mouseEvt$.pipe(takeUntilDestroyed(this._dRef)).subscribe((e) => {
      this.mouseCoords = { x: e.clientX, y: e.clientY };
    });
  }
}
