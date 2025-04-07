import { Component } from '@angular/core';
import { SocialLinksComponent } from '@components/social-links/social-links.component';

@Component({
  selector: 'header[section]',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [SocialLinksComponent],
})
export class HeaderComponent {}
