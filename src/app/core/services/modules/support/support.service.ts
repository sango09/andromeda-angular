import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {environment} from '../../../../../environments/environment';
import {SupportModel} from '../../../modules/support.model';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupportService {
  urlSupport = `${environment.url_api}/support`;
  ticketInformation: SupportModel;

  constructor(
    private http: HttpClient,
  ) {
  }

  getTicketSupportInformation() {
    return this.ticketInformation;
  }

  getAllSupports() {
    return this.http.get<SupportModel[]>(`${this.urlSupport}/`)
      .pipe(
        catchError(this.handleError),
      );
  }

  createSupport(support) {
    return this.http.post<SupportModel>(`${this.urlSupport}/`, support)
      .pipe(
        catchError(this.handleError),
      );
  }

  updateSupport(id: string, changes: {}) {
    return this.http.patch<SupportModel>(`${this.urlSupport}/${id}/`, changes)
      .pipe(
        catchError(this.handleError),
      );
  }

  deleteSupport(id: string) {
    return this.http.delete<SupportModel>(`${this.urlSupport}/${id}/`)
      .pipe(
        catchError(this.handleError),
      );
  }

  getSupport(id: string) {
    return this.http.get<SupportModel>(`${this.urlSupport}/${id}/`)
      .pipe(
        catchError(this.handleError)
      );
  }

  rideSupport(id: string, rating) {
    return this.http.post<SupportModel>(`${this.urlSupport}/${id}/rate/`, rating)
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
