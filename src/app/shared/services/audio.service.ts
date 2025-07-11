import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  loadComplete = signal<boolean>(false);

  load() {
    console.log('load audio files');
    window.setTimeout(() => {
      this.loadComplete.set(true);
    }, 3000);
  }
}
