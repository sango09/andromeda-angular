import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() {
  }

  saveToken(token: string) {
    localStorage.setItem('authorization', token);
  }

  getToken() {
    return localStorage.getItem('authorization');
  }
}
