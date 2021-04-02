import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {ProfileModel} from '../../modules/profile.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  urlUser = `${environment.url_api}/users`;

  constructor(
    private http: HttpClient,
  ) {
  }


  getAllUsers() {
    return this.http.get<ProfileModel[]>(`${this.urlUser}/`)
      .pipe(
        catchError(this.handleError),
      );
  }

  getUserProfile(id: string) {
    return this.http.get<ProfileModel>(`${this.urlUser}/${id}/profile/`)
      .pipe(
        catchError(this.handleError),
      );
  }

  inactiveUser(id: string) {
    return this.http.delete(`${this.urlUser}/${id}/`)
      .pipe(
        catchError(this.handleError),
      );
  }

  changePassword(data) {
    return this.http.post(`${this.urlUser}/change_password/`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  resetPassword(data) {
    return this.http.post(`${this.urlUser}/reset_password/`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  sendEmailPassword(email) {
    return this.http.post(`${this.urlUser}/email_reset_password/`, email)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateDataUser(data, id) {
    return this.http.patch(`${this.urlUser}/${id}/`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error.non_field_errors) {
      return throwError(error.error.non_field_errors);
    } else {
      return throwError(error.error);
    }

  }

}
