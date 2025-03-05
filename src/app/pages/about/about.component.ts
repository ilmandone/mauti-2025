import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ColorDataComponent } from '@components/color-data/color-data.component';
import { HistoryStepComponent } from '@components/history-step/history-step.component';
import { ScreenSizeService } from '../../shared/services/screen-size.service';
import { LogoComponent } from '@components/logo/logo.component';
import { history } from './about.configs';
import { HorScrollDirective } from './hor-scroll.directive';
import { InViewportDirective } from '../../shared/directives/in-viewport.directive';
import { IntroComponent } from '../../sections/intro/intro.component';
import { MoreComponent } from '../../sections/more/more.component';
import { HudGlassShadowDirective } from '../../shared/directives/hud-glass-shadow.directive';

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
      inputs: ['itemsOr: itemsOr'],
    },
  ],
})
class AboutComponent implements OnInit {
  protected readonly history = history;

  private _hrScrollValue = inject(HorScrollDirective, { self: true });

  screenSizeSrv = inject(ScreenSizeService);
  itemsOr = computed(() => {
    return this.screenSizeSrv.relatedTo('t') === 'before' ? 'vertical' : 'horizontal';
  });
  sectionsVisible = signal<Record<Section, boolean>>({
    intro: true,
    more: false,
  });

  scrollValue = 0;

  ngOnInit() {
    this._hrScrollValue.scrollValue.subscribe((r) => {
      this.scrollValue = r;
    });
  }

  sectionChanged(section: Section, $event: { visible: boolean; ratio: number }) {
    const threshold = window.innerWidth / window.innerHeight > 0 ? 0.2 : 0.025;

    if (!this.sectionsVisible()[section])
      this.sectionsVisible.update((cv) => ({ ...cv, [section]: $event.ratio > threshold }));
  }
}

export default AboutComponent;
