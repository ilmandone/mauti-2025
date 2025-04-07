import { AfterViewInit, Component, HostBinding, inject } from '@angular/core';
import { SocialLinksComponent } from '@components/social-links/social-links.component';
import { StateService } from '../../shared/services/state.service';
import { INTRO_DELAY_TIME } from '../../shared/commons';

@Component({
  selector: 'header[section]',
  template: `
    <social-links />
    <div class="extra">1.0 - MVP</div>
  `,
  styleUrl: './header.component.scss',
  imports: [SocialLinksComponent],
})
export class HeaderComponent implements AfterViewInit {
  private _state = inject(StateService);

  @HostBinding('class.ready')
  ready = false;

  @HostBinding('class.hidden')
  get atBottom() {
    return this._state.atBottom();
  }

  ngAfterViewInit() {
    window.setTimeout(() => {
      this.ready = true;
    }, INTRO_DELAY_TIME);
  }
}
