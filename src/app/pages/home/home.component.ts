import { Component } from '@angular/core';
import { HelloComponent } from '../../sections/hello/hello.component';
import { IntroComponent } from '../../sections/intro/intro.component';
import { WebDevelopmentComponent } from '../../sections/web-development/web-development.component';
import { DesignComponent } from '../../sections/design/design.component';
import { PlayComponent } from '../../sections/play/play.component';
import { BoringComponent } from '../../sections/boring/boring.component';
import { FooterComponent } from '../../sections/footer/footer.component';
import { HeaderComponent } from '../../sections/header/header.component';

@Component({
  selector: 'app-home',
  imports: [
    HelloComponent,
    IntroComponent,
    WebDevelopmentComponent,
    DesignComponent,
    PlayComponent,
    BoringComponent,
    FooterComponent,
    HeaderComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export default class HomeComponent {}
