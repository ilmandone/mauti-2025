import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScreenService } from './shared/services/screen.service';
import { LenisService } from './shared/services/lenis.service';
import { AudioService } from './shared/services/audio.service';
import { KeyboardNavigationService } from './shared/services/keyboard-navigation.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private _screen = inject(ScreenService);
  private _lenis = inject(LenisService);
  private _audio = inject(AudioService);
  private _keyboardNav = inject(KeyboardNavigationService);

  ngOnInit() {
    this._screen.init();
    this._lenis.init();
    this._audio.load();
    this._keyboardNav.init();
  }
}
