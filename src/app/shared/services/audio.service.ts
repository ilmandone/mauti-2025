import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private readonly AUDIO_FILES_NAMES = ['audio/click.mp3', 'audio/click2.mp3', 'audio/hover.mp3', 'audio/jump.mp3'];
  private _audioFiles: Map<string, HTMLAudioElement> = new Map();
  private _loadedFiles = 0;

  loading = signal<'no' | 'running' | 'complete'>('no');

  load() {
    this.loading.set('running');

    this.AUDIO_FILES_NAMES.forEach((fn) => {
      const audio = new Audio();
      const name = fn.replace(/audio\/|.mp3/g, '');

      audio.addEventListener('loadeddata', () => {
        this._audioFiles.set(name, audio);
        this._loadedFiles++;

        if (this._loadedFiles === this.AUDIO_FILES_NAMES.length) this.loading.set('complete');
      });

      audio.src = fn;
    });
  }
}
