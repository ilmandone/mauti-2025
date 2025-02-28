import { Component, input } from '@angular/core';
import { ItemOrientation } from '../../shared/commons';

@Component({
  selector: 'app-history-step',
  imports: [],
  template: `
    <div class="def" [className]="'def ' + variant()">// {{ time() }}</div>
    <div [className]="'main ' + variant() + ' ' + orientation()">
      <div>{{ role() }}</div>
      <div>{{ company() }}</div>
    </div>
  `,
  styleUrl: './history-step.component.scss',
})
export class HistoryStepComponent {
  company = input.required<string>();
  orientation = input<ItemOrientation>('horizontal');
  role = input.required<string>();
  time = input.required<string>();
  variant = input<'primary' | 'secondary'>('primary');
}
