import {Injectable, signal} from '@angular/core';

type Sections = 'hello' | 'until now' | 'what'

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private _section = signal<Sections>('hello')
  private _loaded = signal<boolean>(false)

  get section() {
    return this._section.asReadonly()
  }

  setSection(v: Sections) {
    this._section.set(v)
  }

  get loaded() {
    return this._loaded.asReadonly()
  }

  setLoaded(v: boolean) {
    this._loaded.set(v)
  }

}
