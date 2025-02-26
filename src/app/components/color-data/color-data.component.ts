import { Component, input } from '@angular/core';

@Component({
  selector: 'app-color-data',
  imports: [],
  template: `
    <div class="main" [class]="color()" [class.vertical]="orientation() === 'vertical'">
      <ng-content />
    </div>
    <div class="def" [class]="color()">//////// {{ def() }}</div>
  `,
  styleUrl: './color-data.component.scss',
})
export class ColorDataComponent {
  def = input<string>('');
  color = input<'primary' | 'secondary'>('primary');
  orientation = input<'horizontal' | 'vertical'>('horizontal');
}
