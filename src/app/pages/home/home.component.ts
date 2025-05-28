import { Component, effect, inject, signal } from '@angular/core';
import { StateService } from '../../shared/services/state.service';
import { MainLoadingComponent } from '@components/main-loading/main-loading.component';
import { fromEvent } from 'rxjs';
import { HeaderComponent } from '../../sections/header/header.component';
import { HelloComponent } from '../../sections/hello/hello.component';
import { ViewportDirective } from '../../shared/directives/viewport.directive';
import { IntroComponent } from '../../sections/intro/intro.component';
import { WebDevelopmentComponent } from '../../sections/web-development/web-development.component';
import { DesignComponent } from '../../sections/design/design.component';
import { PlayComponent } from '../../sections/play/play.component';
import { BoringComponent } from '../../sections/boring/boring.component';
import { FooterComponent } from '../../sections/footer/footer.component';
import { CustomCursorComponent } from '@components/custom-cursor/custom-cursor.component';

@Component({
  selector: 'app-home',
  imports: [
    MainLoadingComponent,
    HeaderComponent,
    HelloComponent,
    ViewportDirective,
    IntroComponent,
    WebDevelopmentComponent,
    DesignComponent,
    PlayComponent,
    BoringComponent,
    FooterComponent,
    CustomCursorComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export default class HomeComponent {
  private _state = inject(StateService);

  isLoaded = signal<boolean>(false);
  isVisible = signal<boolean>(false);

  constructor() {
    effect(() => {
      const loaded = this.isLoaded();

      if (loaded) {
        const c = document.body.querySelector('.loading--out');
        fromEvent(c!, 'animationend').subscribe((r) => {
          console.log('VISIBLE');
          this.isVisible.set(!!r);
        });
      }
    });
  }

  inPageChange(section: 'top' | 'bottom', $event: boolean) {
    if (section === 'top') this._state.setAtTop($event);
    else this._state.setAtBottom($event);
  }
}
