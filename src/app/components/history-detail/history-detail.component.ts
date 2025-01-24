import {Component, effect, HostBinding, input} from '@angular/core';
import {CareerStep} from '../../sections/until-now-section/until-now-section.component';
import {TextScrambleLeftRightDirective} from '../../shared/directives/text-scramble-left-right.directive';

@Component({
  selector: 'app-history-detail',
  standalone: true,
  template: `
    <span [textScrambleLeftToRight]="data().time" [paused]="!visible()" [iteration]="2" class="period">&nbsp;</span>
    <br>
    <span class="visually-hidden">Role:</span>
    <strong class="flicker-fade-in">{{data().role}}</strong>
    <br>
    <span class="visually-hidden">Company:</span>
    <span [textScrambleLeftToRight]="data().company" [paused]="!visible()" [iteration]="2" class="period">&nbsp;</span>
  `,
  imports: [
    TextScrambleLeftRightDirective
  ],
  styleUrl:'history-detail.component.scss'
})
export class HistoryDetailComponent {

  @HostBinding('class.visible') elVisible = false

  data = input.required<CareerStep>()
  visible = input<boolean>(false)

  constructor() {
    effect(() => {
      this.elVisible = this.visible()
    });
  }
}
