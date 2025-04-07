import { Component, HostBinding, inject } from '@angular/core';
import { SocialLinksComponent } from '@components/social-links/social-links.component';
import { StateService } from '../../shared/services/state.service';

@Component({
  selector: 'header[section]',
  template: `
    <social-links />
    <div class="extra">1.0 - MVP</div>
  `,
  styleUrl: './header.component.scss',
  imports: [SocialLinksComponent],
})
export class HeaderComponent {
  private _state = inject(StateService);

  @HostBinding('class.hidden') get atBottom() {
    return this._state.atBottom();
  }
}
