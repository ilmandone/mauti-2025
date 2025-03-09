import { Component, input } from '@angular/core';
import { ScreenOrientation } from '../../shared/commons';

@Component({
  selector: 'app-color-data',
  imports: [],
  template: `
    <div class="main" [class]="color()" [class.vertical]="orientation() === 'horizontal'">
      <ng-content />
    </div>
    <div class="def" [class]="color()">///// {{ def() }}</div>
  `,
  styleUrl: './color-data.component.scss',
})
export class ColorDataComponent {
  def = input<string>('');
  color = input<'primary' | 'secondary'>('primary');
  orientation = input<ScreenOrientation>('horizontal');
}
