import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private _loaded = signal<boolean>(false)
  private _sectionsReady = signal<number>(0)

  get loaded() {
    return this._loaded.asReadonly()
  }

  setLoaded(v: boolean) {
    this._loaded.set(v)
  }

  get sectionReady() {
    return this._sectionsReady.asReadonly()
  }

  registerSection() {
    this._sectionsReady.set(this.sectionReady() + 1)
  }

}
