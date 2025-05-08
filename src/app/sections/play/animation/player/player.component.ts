import { Component, ElementRef, OnDestroy, OnInit, viewChild } from '@angular/core';
import { BabylonAnimation } from '../babylon-animation';

@Component({
  selector: 'player-babylon',
  imports: [],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss',
})
export class PlayerComponent implements OnInit, OnDestroy {
  private _canvasEl = viewChild.required<ElementRef<HTMLCanvasElement>>('canvasElement');
  private _animation!: BabylonAnimation;

  ngOnInit() {
    this._animation = new BabylonAnimation(this._canvasEl().nativeElement);
    this._animation.init();
  }

  ngOnDestroy() {
    this._animation.destroy();
  }
}
