import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {TokenService} from '../token/token.service';
import {environment} from '../../../../environments/environment';


export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
  providedIn: 'root',
  factory: () => localStorage
});


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  urlAuth = `${environment.url_api}/users`;

  private LOGINURL = `${this.urlAuth}/login/`;
  private SIGNUPURL = `${this.urlAuth}/signup/`;
  private VERIFYURL = `${this.urlAuth}/verify/`;


  constructor(
    @Inject(BROWSER_STORAGE) public storage: Storage,
    private http: HttpClient,
    private token: TokenService,
  ) {
  }

  login(user) {
    return this.http.post<any>(this.LOGINURL, user)
      .pipe(
        catchError(this.handleError),
        tap((data) => {
          const token = data.access_token;
          this.token.saveToken(token);
          localStorage.setItem('userInfo', JSON.stringify(data.user));
          environment.picture = `${environment.url_api}${data.user.profile.picture}`;
        })
      );
  }

  signup(user) {
    return this.http.post<any>(this.SIGNUPURL, user)
      .pipe(
        catchError(this.handleError),
      );
  }


  logout() {
    this.storage.clear();
  }

  verify(token) {
    return this.http.post<any>(this.VERIFYURL, token)
      .pipe(
        catchError(this.handleError),
      );
  }

  userAdmin() {
    let info = JSON.parse(localStorage.getItem('userInfo'));
    return info ? info.is_admin : false;
  }

  userEmployee() {
    let info = JSON.parse(localStorage.getItem('userInfo'));
    return info ? info.is_employee : false;
  }

  userAssistant() {
    let info = JSON.parse(localStorage.getItem('userInfo'));
    return info ? info.is_assistant : false;
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error.email) {
      return throwError('Este correo electronico ya fue registrado');
    } else {
      return throwError(error.error.non_field_errors);
    }
  }
}
