import { Component, computed, inject } from '@angular/core';
import { CareerStep } from '../../sections/until-now-section/until-now-section.component';
import { ColorDataComponent } from '@components/color-data/color-data.component';
import { HistoryStepComponent } from '@components/history-step/history-step.component';
import { ScreenSizeService } from '../../shared/services/screen-size.service';
import { LogoComponent } from '@components/logo/logo.component';
import { history } from './about.configs';

@Component({
  selector: 'app-about',
  imports: [ColorDataComponent, HistoryStepComponent, LogoComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
class AboutComponent {
  private _elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private _elementScroll = 0;

  protected readonly history = history;

  screenSizeSrv = inject(ScreenSizeService);
  itemsOr = computed(() => {
    return this.screenSizeSrv.relatedTo('tl') === 'before' ? 'vertical' : 'horizontal';
  });

  @HostListener('wheel', ['$event'])
  protected onScroll(event$: WheelEvent) {
    if (this.itemsOr() === 'horizontal') return;

    let ns = this._elementScroll + event$.deltaY;
    if (ns < 0) ns = 0;
    if (ns > this._elementRef.nativeElement.scrollWidth - window.innerWidth)
      ns = this._elementRef.nativeElement.scrollWidth - window.innerWidth;
    this._elementScroll = ns;
    this._elementRef.nativeElement.scrollLeft = ns;
  }
}

export default AboutComponent;
