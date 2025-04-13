import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScreenService } from './shared/services/screen.service';
import { LenisService } from './shared/services/lenis.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private _screenSrv = inject(ScreenService);
  private _lenis = inject(LenisService);

  ngOnInit() {
    this._screenSrv.init();
    this._lenis.init();
  }
}
