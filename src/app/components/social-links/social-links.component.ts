import { Component } from '@angular/core';

@Component({
  selector: 'social-links',
  imports: [],
  template: `
    <a href="https://t.me/Aman1975" target="_blank">Telegram</a>
    <a href="mailto:info@mauti.it" target="_blank">&#64;</a>
    <a href="https://www.behance.net/mandinia" target="_blank">Behance</a>
    <a href="https://www.instagram.com/andreamandini/" target="_blank">Linkedin</a>
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
export class SocialLinksComponent {}
