import { Component, effect, HostBinding, input } from '@angular/core';

type ColorBG = 'primary' | 'secondary' | null;

@Component({
  selector: 'app-color-card',
  imports: [],
  templateUrl: './color-card.component.html',
  styleUrl: './color-card.component.scss',
})
export class ColorCardComponent {
  color = input<ColorBG>('primary');

  @HostBinding('class') currentBgColor!: ColorBG;

  constructor() {
    effect(() => {
      this.currentBgColor = this.color();
    });
  }
}
