import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {AssistantsModel} from '../../modules/assistants';
import {environment} from '../../../../environments/environment';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  urlEmployee = `${environment.url_api}/employee`;

  constructor(
    private http: HttpClient,
  ) {
  }

  getEmployee(id: string) {
    return this.http.get<AssistantsModel>(`${this.urlEmployee}/${id}/`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getRequestServices(id: string) {
    return this.http.get<any>(`${this.urlEmployee}/${id}/request_services/`)
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
