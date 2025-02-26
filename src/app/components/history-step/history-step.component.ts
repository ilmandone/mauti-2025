import { Component, input } from '@angular/core';

@Component({
  selector: 'app-history-step',
  imports: [],
  template: `
    <div
      class="def"
      [className]="'def ' + variant()"
    >
      //// {{ time() }}
    </div>
    <div [className]="'main ' + variant()">
      <div>{{ role() }}</div>
      <div>{{ company() }}</div>
    </div>
  `,
  styleUrl: './history-step.component.scss'
})
export class HistoryStepComponent {
  company = input.required<string>()
  role = input.required<string>()
  time = input.required<string>()
  variant = input<'primary' | 'secondary'>('primary')
}
