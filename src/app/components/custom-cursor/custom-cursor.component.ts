import { Component, DestroyRef, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface Coords {
  x: number;
  y: number;
}

@Component({
  selector: 'custom-cursor',
  imports: [],
  templateUrl: './custom-cursor.component.html',
  styleUrl: './custom-cursor.component.scss',
})
export class CustomCursorComponent implements OnInit, OnDestroy {
  private _destroyRef = inject(DestroyRef);
  private _element = inject(ElementRef);
  private _raf!: number;
  private _targetCoords: Coords = { x: 0, y: 0 };
  private _currentCoords: Coords = { x: 0, y: 0 };
  private _angle: number = 0;
  private readonly _orbitRadius: number = 32;

  @ViewChild('content', { read: ElementRef, static: true }) private _content!: ElementRef<HTMLElement>;

  private _update() {
    this._currentCoords.x = this._currentCoords.x + (this._targetCoords.x - this._currentCoords.x) / 40;
    this._currentCoords.y = this._currentCoords.y + (this._targetCoords.y - this._currentCoords.y) / 40;

    const dx = this._targetCoords.x - this._currentCoords.x;
    const dy = this._targetCoords.y - this._currentCoords.y;

    if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
      this._angle = Math.atan2(dy, dx);
    }

    const distance = Math.sqrt(dx * dx + dy * dy);

    let finalX = this._currentCoords.x;
    let finalY = this._currentCoords.y;

    if (distance < this._orbitRadius) {
      const ratio = 1 - this._orbitRadius / distance;
      finalX = this._currentCoords.x + dx * ratio;
      finalY = this._currentCoords.y + dy * ratio;
    }

    const angleInDegrees = (this._angle * 180) / Math.PI;

    this._element.nativeElement.style.transform = `translate(${finalX}px, ${finalY}px)`;
    this._content.nativeElement.style.transform = `translate(-50%, -50%) rotate(${angleInDegrees}deg)`;

    this._raf = requestAnimationFrame(this._update.bind(this));
  }

  ngOnInit() {
    if (navigator.maxTouchPoints === 0) {
      fromEvent<PointerEvent>(window, 'pointermove')
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe((event: PointerEvent) => {
          this._targetCoords = { x: event.clientX, y: event.clientY };
        });

      this._raf = requestAnimationFrame(this._update.bind(this));
    }
  }

  ngOnDestroy() {
    if (this._raf) cancelAnimationFrame(this._raf);
  }
}
