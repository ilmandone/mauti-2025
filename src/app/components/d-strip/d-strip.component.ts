import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { debounceTime, fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ScreenService, ScreenSize } from '../../shared/services/screen.service';

interface ColorStep {
  bg: string;
  color: string;
}

@Component({
  selector: 'app-d-strip',
  imports: [NgTemplateOutlet],
  templateUrl: './d-strip.component.html',
  styleUrl: './d-strip.component.scss',
})
export class DStripComponent implements OnInit {
  private _screen = inject(ScreenService);
  private _destroyRef = inject(DestroyRef);

  private _colorSequence: ColorStep[] = [
    {
      bg: '--text-color',
      color: '--bg-color',
    },
    {
      bg: '--bg-color',
      color: '--text-color',
    },
    {
      bg: '--secondary-color',
      color: '--bg-color',
    },
    {
      bg: '--primary-color',
      color: '--bg-color',
    },
    {
      bg: '--bg-color',
      color: '--primary-color',
    },
  ];

  private _screenMap = new Map<ScreenSize, number>([
    ['t', 4],
    ['tl', 4],
    ['d', 5],
    ['dm', 5],
    ['dl', 6],
    ['dxl', 6],
  ]);

  stripList = signal<ColorStep[]>([]);

  private _generateStrip() {
    const amount = this._screenMap.get(this._screen.size() ?? 't') || 3;
    const newSequence: ColorStep[] = [];

    for (let i = 0; i < amount; i++) {
      const originalIndex = i % this._colorSequence.length;
      console.log(originalIndex);
      newSequence.push({ ...this._colorSequence[originalIndex] });
    }
    console.log(newSequence);

    this.stripList.set(newSequence);
  }

  ngOnInit() {
    fromEvent(window, 'resize')
      .pipe(takeUntilDestroyed(this._destroyRef), debounceTime(50))
      .subscribe(() => {
        this._generateStrip();
      });

    this._generateStrip();
  }
}
