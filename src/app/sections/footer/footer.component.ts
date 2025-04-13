import { Component } from '@angular/core';
import { SocialLinksComponent } from '@components/social-links/social-links.component';

@Component({
  selector: 'footer[section]',
  imports: [SocialLinksComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {}
