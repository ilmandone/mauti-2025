import { Component, computed, inject } from '@angular/core';
import { ColorDataComponent } from '@components/color-data/color-data.component';
import { HistoryStepComponent } from '@components/history-step/history-step.component';
import { ScreenSizeService } from '../../shared/services/screen-size.service';
import { LogoComponent } from '@components/logo/logo.component';
import { history } from './about.configs';
import { HorScrollDirective } from './hor-scroll.directive';
import { InViewportDirective } from '../../shared/directives/in-viewport.directive';

@Component({
  selector: 'app-about',
  imports: [ColorDataComponent, HistoryStepComponent, LogoComponent, InViewportDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  hostDirectives: [{ directive: HorScrollDirective, inputs: ['itemsOr: itemsOr'] }],
})
class AboutComponent {
  protected readonly history = history;

  screenSizeSrv = inject(ScreenSizeService);
  itemsOr = computed(() => {
    return this.screenSizeSrv.relatedTo('t') === 'before' ? 'vertical' : 'horizontal';
  });

  sectionChanged(section: string, $event: { visible: boolean; ratio: number }) {
    console.log('*********************************** RATIO');
    console.log(section);
    console.log($event);
  }
}

export default AboutComponent;
