import { Component } from '@angular/core';
import { SocialLinksComponent } from '@components/social-links/social-links.component';
import { SoundButtonComponent } from '@components/sound-button/sound-button.component';

@Component({
  selector: 'footer[section]',
  imports: [SocialLinksComponent, SoundButtonComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {}
