import { inject, Injectable, signal } from '@angular/core';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root',
})
export class AckService{
  private _stateSrv = inject(StateService)
  private readonly ACK_LS_KEY = 'ack'

  private _ack = signal<boolean | undefined>(undefined);

  private _getAckFromLocalStorage(): boolean | null {
    try {
      const item = localStorage.getItem(this.ACK_LS_KEY);
      if (item === null) {
        return null;
      }
      return JSON.parse(item) as boolean;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  }

  private _setAckToLocalStorage(v: boolean): void {
    try {
      const serializedValue = JSON.stringify(v);
      localStorage.setItem(this.ACK_LS_KEY, serializedValue);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      throw error;
    }
  }

  constructor() {
    const ack = this._getAckFromLocalStorage();
    if (ack !== null) {
      this._ack.set(ack);
      this._stateSrv.setReady(true)
    }
  }

  get ack() {
    return this._ack.asReadonly();
  }

  setAck(v: boolean) {
    this._ack.set(v);
    this._setAckToLocalStorage(v)
    this._stateSrv.setReady(true)
  }
}
