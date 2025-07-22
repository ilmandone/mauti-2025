import { effect, inject, Injectable, signal } from '@angular/core';
import { StateService } from './state.service';

export interface AudioOptions {
  reset?: boolean;
  loop?: boolean;
  volume?: number;
}

export type AudioActions = 'play' | 'pause';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private readonly _state = inject(StateService);

  private readonly AUDIO_FILES_FOLDER = 'audio/';
  private readonly AUDIO_FILES_NAMES = [
    'click.mp3',
    'click2.mp3',
    'click3.mp3',
    'hover.mp3',
    'jump.mp3',
    'jump2.mp3',
    'play.mp3',
    'bg.mp3',
  ];
  private readonly AUDIO_DEFAULT_OPTIONS: Required<AudioOptions> = {
    loop: false,
    volume: 1,
    reset: false,
  };

  private _audioFiles: Map<string, HTMLAudioElement> = new Map();
  private _loadedFiles = 0;

  loading = signal<'no' | 'running' | 'complete'>('no');

  constructor() {
    effect(() => {
      const soundsOn = this._state.soundsOn();
      if (soundsOn === null) return;
      this.exec('bg', !soundsOn ? 'pause' : 'play', { loop: true, volume: 0.65 });
    });
  }

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

  exec(soundKey: string, action: AudioActions = 'play', options?: AudioOptions) {
    const opt: Required<AudioOptions> = { ...this.AUDIO_DEFAULT_OPTIONS, ...options };

    const ae = this._getAudioFromKey(soundKey);
    ae.loop = opt.loop;
    ae.volume = opt.volume;
    if (opt.reset) ae.currentTime = 0;

    void ae[action]();
  }

  setVolume(soundKey: string, vol: number) {
    const ae = this._getAudioFromKey(soundKey);
    if (vol < 0 || vol > 1) console.error(`Wrong volume for ${ae}`);
    ae.volume = vol;
  }

  /**
   * Return a audio element from the map by key
   * @param soundKey
   * @private
   */
  private _getAudioFromKey(soundKey: string): HTMLAudioElement {
    const ae = this._audioFiles.get(soundKey);
    if (!ae) throw new Error(`No sound with ${ae}`);
    return ae;
  }
}
