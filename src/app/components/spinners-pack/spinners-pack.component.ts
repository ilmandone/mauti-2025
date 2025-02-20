import { AfterViewInit, Component, DestroyRef, ElementRef, inject, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Coords2D } from '../../shared/commons';
import { CharSpinnerComponent } from '@components/char-spinner/char-spinner.component';

@Component({
  selector: 'spinners-pack',
  imports: [CharSpinnerComponent],
  template: `
    @for(s of [].constructor(spinnersAmount); track $index) {
      <char-spinner [mousePos]="mouseCoords"/>
    }
  `,
  styleUrl: './spinners-pack.component.scss',
})
export class SpinnersPackComponent implements OnInit, AfterViewInit {
  private _dRef = inject(DestroyRef);
  private _elN: HTMLElement = inject(ElementRef).nativeElement

  private _mouseEvt$ = fromEvent<MouseEvent>(document, 'mousemove');

  mouseCoords!: Coords2D;
  spinnersAmount!: number;

  ngOnInit() {
    this._mouseEvt$.pipe(takeUntilDestroyed(this._dRef)).subscribe((e) => {
      this.mouseCoords = { x: e.clientX, y: e.clientY };
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const w = this._elN.offsetWidth > this._elN.offsetHeight ? this._elN.offsetWidth : this._elN.offsetHeight;
      this.spinnersAmount = Math.round(w / 17);
    },200)
  }
}
