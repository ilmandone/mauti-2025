import { Component } from '@angular/core';
import { SocialLinksComponent } from '@components/social-links/social-links.component';
import { SoundButtonComponent } from '@components/sound-button/sound-button.component';
import { EmoticonComponent } from '@components/emoticon/emoticon.component';

@Component({
  selector: 'footer[section]',
  imports: [SocialLinksComponent, SoundButtonComponent, EmoticonComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {}
