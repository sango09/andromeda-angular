import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {AssistantsModel} from '../../modules/assistants';

@Injectable({
  providedIn: 'root'
})
export class AssistantsService {

  urlAssistants = `${environment.url_api}/assistants`;

  constructor(
    private http: HttpClient,
  ) {
  }

  getAllAssistants() {
    return this.http.get<AssistantsModel[]>(`${this.urlAssistants}/`)
      .pipe(
        catchError(this.handleError),
      );
  }

  getAssistant(id: string) {
    return this.http.get<AssistantsModel>(`${this.urlAssistants}/${id}/`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getServicesAssigned(id: string) {
    return this.http.get<any>(`${this.urlAssistants}/${id}/services_assigned/`)
      .pipe(
        catchError(this.handleError)
      );
  }

  servicesStats() {
    return this.http.get(`${this.urlAssistants}/services_stats/`)
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


