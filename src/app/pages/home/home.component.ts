import { Component } from '@angular/core';
import { HelloComponent } from '../../sections/hello/hello.component';
import { IntroComponent } from '../../sections/intro/intro.component';
import { WebDevelopmentComponent } from '../../sections/web-development/web-development.component';

@Component({
  selector: 'app-home',
  imports: [HelloComponent, IntroComponent, WebDevelopmentComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export default class HomeComponent {}
