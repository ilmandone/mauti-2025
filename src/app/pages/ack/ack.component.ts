import { AckService } from '../../shared/services/ack.service';
import { ButtonComponent } from '@components/button/button.component';
import { Component, inject, OnInit } from '@angular/core';
import { ANIMATION_DELAY } from '../../shared/commons';
import { Router } from '@angular/router';
import { ScreenSizeService } from '../../shared/services/screen-size.service';
import { SpinnersPackComponent } from '@components/spinners-pack/spinners-pack.component';
import { TextScrambleLeftRightDirective } from '../../shared/directives/text-scramble-left-right.directive';
import { checkMobile } from '../../shared/detect.mobile';

@Component({
  selector: 'app-ack',
  imports: [ButtonComponent, TextScrambleLeftRightDirective, SpinnersPackComponent],
  templateUrl: './ack.component.html',
  styleUrl: './ack.component.scss',
})
class AckComponent implements OnInit {
  private _ackService = inject(AckService)
  private _router = inject(Router)

  screenSizeSrv = inject(ScreenSizeService)
  spinnerRunning = checkMobile()
  state: 'start' | 'visible' | 'hide' = 'start';

  ngOnInit(): void {
    setTimeout(() => {
      this.state = 'visible';
    }, ANIMATION_DELAY);
  }

  readonly checkMobile = checkMobile;

  handleACK(b: boolean) {
    this._ackService.setAck(b)
    this.state = 'hide'
  }

  hideTransitionCompleted() {
    void this._router.navigate(['/'])
  }
}

export default AckComponent;
