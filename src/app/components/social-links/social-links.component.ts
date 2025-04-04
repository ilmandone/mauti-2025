import { Component, effect, inject } from '@angular/core';
import { ScreenService } from '../../shared/services/screen.service';
import { socialTextMap } from '@components/social-links/social_links.data';

@Component({
  selector: 'social-links',
  imports: [],
  template: `
    <a href="https://t.me/Aman1975" target="_blank">{{ currentTextMap.get('te') }}</a>
    <a href="mailto:info@mauti.it" target="_blank">&#64;</a>
    <a href="https://www.behance.net/mandinia" target="_blank">{{ currentTextMap.get('be') }}</a>
    <a href="https://www.instagram.com/andreamandini/" target="_blank">{{ currentTextMap.get('l') }}</a>
  `,
  styles: `
    :host {
      position: relative;
      display: flex;
      justify-content: flex-start;

      > *:not(:last-child) {
        margin-right: 5vw;
      }
    }
  `,
})
export class SocialLinksComponent {
  private _screen = inject(ScreenService);

  currentTextMap!: Map<string, string>;

  constructor() {
    effect(() => {
      const rt = this._screen.relativeTo('d')();
      const lm = socialTextMap.get(rt === 'after' ? 'long' : 'short');

      if (lm) this.currentTextMap = lm;
    });
  }
}
