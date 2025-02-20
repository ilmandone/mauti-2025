import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '@components/button/button.component';
import { TextScrambleLeftRightDirective } from '../../shared/directives/text-scramble-left-right.directive';
import { SpinnersPackComponent } from '@components/spinners-pack/spinners-pack.component';

@Component({
  selector: 'app-ack',
  imports: [ButtonComponent, TextScrambleLeftRightDirective, SpinnersPackComponent],
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

export default AckComponent;
