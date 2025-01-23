import {Component, input} from '@angular/core';
import {CareerStep} from '../../sections/until-now-section/until-now-section.component';

@Component({
  selector: 'app-history-detail',
  standalone: true,
  template: `
    <span class="period">{{ data()?.time }}</span>
    <br>
    <span class="visually-hidden">Role:</span>
    <strong>{{ data()?.role }}</strong>
    <br>
    <span class="visually-hidden">Company:</span>
    <span>{{ data()?.company }}</span>
  `,
  styles: `
    span {
      color: var(--secondary-color);
    }
  `
})
export class HistoryDetailComponent {

  data = input<CareerStep>()

}
