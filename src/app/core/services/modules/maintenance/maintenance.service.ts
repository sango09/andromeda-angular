import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {environment} from '../../../../../environments/environment';
import {MaintenanceModel} from '../../../modules/maintenance';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {

  urlMaintenance = `${environment.url_api}/maintenance`;
  ticketInformation: MaintenanceModel;

  constructor(
    private http: HttpClient
  ) {
  }

  getTicketMaintenanceInformation() {
    return this.ticketInformation;
  }

  getAllMaintenance() {
    return this.http.get<MaintenanceModel[]>(`${this.urlMaintenance}/`)
      .pipe(
        catchError(this.handleError),
      );
  }

  createMaintenance(maintenance) {
    return this.http.post<MaintenanceModel>(`${this.urlMaintenance}/`, maintenance)
      .pipe(
        catchError(this.handleError),
      );
  }

  updateMaintenance(id: string, changes: {}) {
    return this.http.patch(`${this.urlMaintenance}/${id}/`, changes)
      .pipe(
        catchError(this.handleError),
      );
  }

  getMaintenance(id: string) {
    return this.http.get(`${this.urlMaintenance}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteMaintenance(id: string) {
    return this.http.delete(`${this.urlMaintenance}/${id}`)
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


