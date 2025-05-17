import { Component, inject } from '@angular/core';
import { StateService } from '../../shared/services/state.service';
import { MainLoadingComponent } from '@components/main-loading/main-loading.component';
import { FooterComponent } from '../../sections/footer/footer.component';
import { BoringComponent } from '../../sections/boring/boring.component';
import { ViewportDirective } from '../../shared/directives/viewport.directive';
import { PlayComponent } from '../../sections/play/play.component';
import { DesignComponent } from '../../sections/design/design.component';
import { WebDevelopmentComponent } from '../../sections/web-development/web-development.component';
import { IntroComponent } from '../../sections/intro/intro.component';
import { HelloComponent } from '../../sections/hello/hello.component';
import { HeaderComponent } from '../../sections/header/header.component';
import { CustomCursorComponent } from '@components/custom-cursor/custom-cursor.component';

@Component({
  selector: 'app-home',
  imports: [
    MainLoadingComponent,
    FooterComponent,
    BoringComponent,
    ViewportDirective,
    PlayComponent,
    DesignComponent,
    WebDevelopmentComponent,
    IntroComponent,
    HelloComponent,
    HeaderComponent,
    CustomCursorComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export default class HomeComponent {
  private _state = inject(StateService);

  inPageChange(section: 'top' | 'bottom', $event: boolean) {
    if (section === 'top') this._state.setAtTop($event);
    else this._state.setAtBottom($event);
  }
}
