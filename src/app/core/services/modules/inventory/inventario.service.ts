import {environment} from '../../../../../environments/environment';
import {ImplementModel} from '../../../modules/implement.model';
import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {FichaTecnicaModel} from '../../../modules/fichaTecnica.model';


@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  urlInventory = `${environment.url_api}/inventory`;
  urlSheets = `${environment.url_api}/tech-tab`;

  constructor(
    private http: HttpClient,
  ) {
  }

  getAllInventory() {
    return this.http.get<ImplementModel[]>(`${this.urlInventory}/`)
      .pipe(
        catchError(this.handleError),
      );
  }


  ingresarImplemento(inventory) {
    return this.http.post<any>(`${this.urlInventory}/`, inventory)
      .pipe(
        catchError(this.handleError),
      );
  }

  getInventory(id: string) {
    return this.http.get<ImplementModel>(`${this.urlInventory}/${id}`);
  }

  getFichaTecnica() {
    return this.http.get<FichaTecnicaModel[]>(`${this.urlSheets}/ `)
      .pipe(
        catchError(this.handleError),
      );
  }

  getAllFichaTecnica(id: string) {
    return this.http.get<FichaTecnicaModel[]>(`${this.urlSheets}/${id}/ `)
      .pipe(
        catchError(this.handleError),
      );
  }

  updateInventory(id: string, changes: Partial<ImplementModel>) {
    return this.http.patch(`${this.urlInventory}/${id}/`, changes)
      .pipe(
        catchError(this.handleError)
      );
  }

  ingresarFicha(ficha) {
    return this.http.post<any>(`${this.urlSheets}/`, ficha)
      .pipe(
        catchError(this.handleError),
      );
  }

  inactivateImplement(id: string) {
    return this.http.delete(`${this.urlInventory}/${id}`)
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
