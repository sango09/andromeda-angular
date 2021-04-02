import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {ImplementModel} from '../../../modules/implement.model';
import {environment} from '../../../../../environments/environment';
import {LoansModel} from '../../../modules/loans.model';


@Injectable({
  providedIn: 'root'
})
export class LoansService {
  urlInventoryLoans = `${environment.url_api}/inventory-loans`;
  urlLoans = `${environment.url_api}/loans`;

  constructor(
    private http: HttpClient,
  ) {
  }

  getAllInventoryLoans() {
    return this.http.get<ImplementModel[]>(`${this.urlInventoryLoans}/`)
      .pipe(
        catchError(this.handleError),
      );
  }

  getImplementInventory(implement: string) {
    return this.http.get<ImplementModel[]>(`${this.urlInventoryLoans}/${implement}/`)
      .pipe(
        catchError(this.handleError)
      );
  }


  createLoans(loans) {
    return this.http.post<any>(`${this.urlLoans}/`, loans)
      .pipe(
        catchError(this.handleError),
      );
  }

  getAllLoans() {
    return this.http.get<LoansModel>(`${this.urlLoans}/`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getLoan(id: string) {
    return this.http.get<LoansModel>(`${this.urlLoans}/${id}/`)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateLoan(id: string, changes: {}) {
    return this.http.patch(`${this.urlLoans}/${id}/`, changes)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteLoan(id: string) {
    return this.http.delete(`${this.urlLoans}/${id}`)
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
