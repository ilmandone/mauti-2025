import { Component, DestroyRef, ElementRef, inject, OnInit, signal } from '@angular/core';
import { ColorDataComponent } from '@components/color-data/color-data.component';
import { HistoryStepComponent } from '@components/history-step/history-step.component';
import { LogoComponent } from '@components/logo/logo.component';
import { history } from './about.configs';
import { HorScrollDirective } from './hor-scroll.directive';
import { InViewportDirective } from '../../shared/directives/in-viewport.directive';
import { IntroComponent } from '../../sections/intro/intro.component';
import { MoreComponent } from '../../sections/more/more.component';
import { HudGlassShadowDirective } from '../../shared/directives/hud-glass-shadow.directive';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';
import { ScreenService } from '../../shared/services/screen.service';

type Section = 'intro' | 'more';

@Component({
  selector: 'app-about',
  imports: [
    ColorDataComponent,
    HistoryStepComponent,
    LogoComponent,
    InViewportDirective,
    IntroComponent,
    MoreComponent,
    HudGlassShadowDirective,
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  hostDirectives: [
    {
      directive: HorScrollDirective,
    },
  ],
  host: {
    '[class.initial-position]': '!logoVisible',
  },
})
class AboutComponent implements OnInit {
  private _destroyRef = inject(DestroyRef);
  private _el = inject(ElementRef).nativeElement;
  private _screenSrv = inject(ScreenService);

  nativeScroll = fromEvent<Event>(this._el, 'scroll');

  protected readonly history = history;
  protected readonly screenSrv = inject(ScreenService);

  sectionsVisible = signal<Record<Section, boolean>>({
    intro: false,
    more: false,
  });

  hudAutoUpdate = true;
  logoVisible = false;

  scrollUpdate = 0;
  scrollProgress = 0;

  ngOnInit() {
    this.nativeScroll.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((r: Event) => {
      this.scrollUpdate = r.timeStamp;

      const sh = this._screenSrv.screenOrientation();
      const scrollTotal =
        sh === 'horizontal' ? this._el.scrollWidth - window.innerWidth : this._el.scrollHeight - window.innerHeight;
      const sp = sh === 'horizontal' ? this._el.scrollLeft : this._el.scrollTop;

      this.scrollProgress = Math.round((sp / scrollTotal) * 100);
    });
  }

  sectionChanged(section: Section, $event: { visible: boolean; ratio: number }) {
    const threshold = this._screenSrv.screenOrientation() === 'horizontal' ? 0.2 : 0.025;

    if (!this.sectionsVisible()[section])
      this.sectionsVisible.update((cv) => ({ ...cv, [section]: $event.ratio > threshold }));
  }

  logoVisibleChange($event: boolean) {
    this.logoVisible = $event;
    if ($event)
      window.setTimeout(() => {
        this.hudAutoUpdate = false;
      }, 1000);
  }
}

export default AboutComponent;
