import {Injectable, signal} from '@angular/core';

type Sections = 'hello' | 'until now' | 'what'

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private _section = signal<Sections>('hello')

  get section() {
    return this._section.asReadonly()
  }

  setSection(v: Sections) {
    this._section.set(v)
  }
}
