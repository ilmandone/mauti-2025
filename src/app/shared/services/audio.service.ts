import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private readonly AUDIO_FILES_FOLDER = 'audio/';
  private readonly AUDIO_FILES_NAMES = ['click.mp3', 'click2.mp3', 'hover.mp3', 'jump.mp3', 'jump2.mp3', 'bg.mp3'];

  private _audioFiles: Map<string, HTMLAudioElement> = new Map();
  private _loadedFiles = 0;

  loading = signal<'no' | 'running' | 'complete'>('no');

  load() {
    this.loading.set('running');

    this.AUDIO_FILES_NAMES.forEach((fn) => {
      const audio = new Audio();
      const name = fn.replace(/.mp3/g, '');

      audio.addEventListener('loadeddata', () => {
        this._audioFiles.set(name, audio);
        this._loadedFiles++;

        if (this._loadedFiles === this.AUDIO_FILES_NAMES.length) this.loading.set('complete');
      });

      audio.src = this.AUDIO_FILES_FOLDER + fn;
    });
  }

  play(soundKey: string, loop = false, volume = 1) {
    const ae = this._getAudioFromKey(soundKey);
    ae.loop = loop;
    ae.volume = volume;
    void ae.play();
  }

  pause(soundKey: string, reset = false) {
    const ae = this._getAudioFromKey(soundKey);
    ae.pause();
    if (reset) ae.currentTime = 0;
  }

  setVolume(soundKey: string, vol: number) {
    const ae = this._getAudioFromKey(soundKey);
    if (vol < 0 || vol > 1) console.error(`Wrong volume for ${ae}`);
    ae.volume = vol;
  }

  private _getAudioFromKey(soundKey: string): HTMLAudioElement {
    const ae = this._audioFiles.get(soundKey);
    if (!ae) throw new Error(`No sound with ${ae}`);
    return ae;
  }
}
