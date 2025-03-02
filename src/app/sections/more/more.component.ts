import { Component, effect, HostBinding, input } from '@angular/core';
import { TextScrambleLeftRightDirective } from '../../shared/directives/text-scramble-left-right.directive';

@Component({
  selector: 'section[more]',
  imports: [TextScrambleLeftRightDirective],
  templateUrl: './more.component.html',
  styleUrl: './more.component.scss',
})
export class MoreComponent {
  visible = input<boolean>(false);

  @HostBinding('class.visible') isVisible!: boolean;

  constructor() {
    effect(() => {
      this.isVisible = this.visible();
    });
  }
}
