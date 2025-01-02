import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookiesService {

  /**
   * Get cookie value
   * @param {string} name
   * @return {string | null}
   */
  public getCookie(name: string): string | null {
    const cookies = document.cookie.split(';');

    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.startsWith(name + '=')) {
        return decodeURIComponent(cookie.substring(name.length + 1));
      }
    }
    return null;
  }

  /**
   * Set a cookie value
   * @param {string} name
   * @param {string} value
   * @param {string} expirationDays
   * @param {string} path
   */
  public setCookie(
    name: string,
    value: string,
    expirationDays: number = 7,
    path: string = '/'
  ): void {
    const date = new Date();
    date.setTime(date.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;

    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)};${expires};path=${path}`;
  }

  /**
   * Delete a cookie
   * @param {string} name
   * @param {string} path
   */
  public deleteCookie(name: string, path: string = '/'): void {
    document.cookie = `${encodeURIComponent(name)}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=${path}`;
  }
}
