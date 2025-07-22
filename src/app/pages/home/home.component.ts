import { Component, computed, DestroyRef, effect, inject, signal } from '@angular/core';
import { StateService } from '../../shared/services/state.service';
import { MainLoadingComponent } from '@components/main-loading/main-loading.component';
import { filter, fromEvent, takeUntil } from 'rxjs';
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
import { AudioService } from '../../shared/services/audio.service';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';

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
  private _destroyRef = inject(DestroyRef);
  private _state = inject(StateService);
  audioSrv = inject(AudioService);

  isLoaded = signal<boolean>(false);
  isVisible = signal<boolean>(false);

  cursorText = computed(() => {
    const at = this._state.atTop();
    const sOn = this._state.soundsOn();
    const sOnAtLastOnce = this._state.soundPlaysAtLastOnce();

    return at && !sOn && !sOnAtLastOnce ? 'CLICK FOR SOUND' : undefined;
  });

  constructor() {
    this._setupPointerEventListener();
    this._setupLoadingEffect();
  }

  inPageChange(section: 'top' | 'bottom', $event: boolean) {
    if (section === 'top') this._state.setAtTop($event);
    else this._state.setAtBottom($event);
  }

  private _setupLoadingEffect() {
    effect(() => {
      const loaded = this.isLoaded();

      if (loaded) {
        const c = document.body.querySelector('.loading--out');
        fromEvent(c!, 'animationend').subscribe((r) => {
          this.isVisible.set(!!r);
        });
      }
    });
  }

  /**
   * Listen the document click in the top section until the sound is played once
   * @private
   */
  private _setupPointerEventListener() {
    const stopListening$ = toObservable(this._state.soundPlaysAtLastOnce).pipe(filter(Boolean));

    fromEvent(document, 'pointerup')
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        takeUntil(stopListening$),
        filter(() => this._state.atTop())
      )
      .subscribe(() => {
        this._state.setSoundsOn(true);
      });
  }
}
