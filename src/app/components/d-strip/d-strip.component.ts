import { Component, computed, inject } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { ScreenService, ScreenSize } from '../../shared/services/screen.service';
import { DStripSpinnerDirective } from '@components/d-strip/d-strip-spinner.directive';

interface ColorStep {
  bg: string;
  color: string;
}

@Component({
  selector: 'app-d-strip',
  imports: [NgTemplateOutlet, DStripSpinnerDirective],
  templateUrl: './d-strip.component.html',
  styleUrl: './d-strip.component.scss',
})
export class DStripComponent {
  private _screen = inject(ScreenService);

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

  stripList = computed(() => {
    const amount = this._screenMap.get(this._screen.size() ?? 't') || 3;
    const newSequence: ColorStep[] = [];

    for (let i = 0; i < amount; i++) {
      const originalIndex = i % this._colorSequence.length;
      newSequence.push({ ...this._colorSequence[originalIndex] });
    }

    return newSequence;
  });

  dWidth = computed(() => {
    return `${window.innerWidth / this.stripList().length}px`;
  });
}
