import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {catchError, tap} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class UpdateService {

  constructor(
    private http: HttpClient
  ) {
  }

  updateProfile(id: string, changes: FormData) {
    return this.http.patch(`${environment.url_api}/users/${id}/`, changes)
      .pipe(
        catchError(this.handleError),
        tap((data) => {
          localStorage.removeItem('userInfo');
          localStorage.setItem('userInfo', JSON.stringify(data));
          // @ts-ignore
          environment.picture = data.profile.picture;
          console.log(environment.picture);
        })
      );
  }


  private handleError(error: HttpErrorResponse) {
    console.log(error.error);
    return throwError(error.error.non_field_errors);
  }
}
