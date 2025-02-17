import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '@components/button/button.component';
import { TextScrambleLeftRightDirective } from '../../shared/directives/text-scramble-left-right.directive';

@Component({
  selector: 'app-ack',
  imports: [ButtonComponent, TextScrambleLeftRightDirective],
  templateUrl: './ack.component.html',
  styleUrl: './ack.component.scss',
})
class AckComponent implements OnInit {
  visible = false;

  ngOnInit(): void {
    setTimeout(() => {
      this.visible = true;
    }, 400);
  }
}

export default AckComponent
